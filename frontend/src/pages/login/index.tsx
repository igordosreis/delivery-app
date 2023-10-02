import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { IUser } from '@/interfaces/IUser';
import postLogin from '@/services/handleLoginRequests';
import { login } from '@/redux/features/users/userSlice';
import {
  getUserDataOnLocalStorage,
  saveUserDataOnLocalStorage,
} from '@/services/handleLocalStorage';
import {
  HTTP_OK,
  NUM_PASSWORD_MIN_LENGTH,
  PATH_ADMIN,
  PATH_CUSTOMER,
  PATH_MANAGE,
  PATH_ORDERS,
  PATH_PRODUCTS,
  PATH_REGISTER,
  PATH_SELLER,
  REGEX_EMAIL,
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_SELLER,
} from '@/constants';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isUserNotFound, setUserIsNotFound] = useState(false);

  // Validation
  const validateInputFields = () => {
    const isEmailValid = REGEX_EMAIL.test(emailInput);
    const isPasswordValid = passwordInput.length > NUM_PASSWORD_MIN_LENGTH;
    const areAllInputsValid = isEmailValid && isPasswordValid;

    return areAllInputsValid;
  };

  const isDisabled = !validateInputFields();

  // Handlers
  const handleEmailInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) =>
    setEmailInput(value);

  const handlePasswordInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) =>
    setPasswordInput(value);

  const saveUserDataAndGoToNextPage = (userData: IUser) => {
    saveUserDataOnLocalStorage(userData);
    const payload = { userData };
    dispatch(login(payload));

    const isUserAdmin = userData.role === ROLE_ADMIN;
    const isUserCustomer = userData.role === ROLE_CUSTOMER;
    const isUserSeller = userData.role === ROLE_SELLER;

    if (isUserAdmin) return router.push(`/${PATH_ADMIN}/${PATH_MANAGE}`);
    if (isUserCustomer) return router.push(`/${PATH_CUSTOMER}/${PATH_PRODUCTS}`);
    if (isUserSeller) return router.push(`/${PATH_SELLER}/${PATH_ORDERS}`);
  };

  const handleLoginResponse = (response: { userData: IUser; status: number }) => {
    const { userData, status } = response;
    const isLoginResponseValid = status === HTTP_OK;
    if (isLoginResponseValid) {
      saveUserDataAndGoToNextPage(userData);
    } else {
      setUserIsNotFound(true);
    }
  };

  const handleEnterButtonClick = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const request = { email: emailInput, password: passwordInput };
    const response = await postLogin(request);
    handleLoginResponse(response);
  };

  const handleRegisterButtonClick = () => {
    router.push(`/${PATH_REGISTER}`);
  };

  useEffect(() => {
    const userFromLocalStorage = getUserDataOnLocalStorage();
    const isUserFound = Object.keys(userFromLocalStorage).length > 0;
    if (isUserFound) saveUserDataAndGoToNextPage(userFromLocalStorage);
  }, []);

  // Rendering
  const renderInvalidEmailOrPasswordMessage = () => (
    <div data-testid="common_login__element-invalid-email">
      Email ou senha inválidos
    </div>
  );

  return (
    <div className="lr-container">
      <div className="lr-card">
        <header className="lr-header">
          <div className="header-content">
            {/* <img src="https://i.imgur.com/4nEw7Wb.png" alt="logo" className="logo-img" /> */}
            <h1>Dona Tereza</h1>
          </div>
        </header>
        <div className="lr-content">
          <h1>Login</h1>
          <form className="lr-form" onSubmit={handleEnterButtonClick}>
            <input
              className="txt-box"
              data-testid="common_login__input-email"
              type="email"
              placeholder="Email"
              name="emailInput"
              value={emailInput}
              onChange={handleEmailInput}
            />
            <input
              className="txt-box"
              data-testid="common_login__input-password"
              type="password"
              placeholder="Password"
              name="passwordInput"
              value={passwordInput}
              onChange={handlePasswordInput}
            />
            <button
              className="finish-btn"
              data-testid="common_login__button-login"
              type="submit"
              disabled={isDisabled}
            >
              LOGIN
            </button>
            <button
              className="register-btn"
              data-testid="common_login__button-register"
              type="button"
              onClick={handleRegisterButtonClick}
            >
              Ainda não tenho conta
            </button>
            {isUserNotFound && renderInvalidEmailOrPasswordMessage()}
          </form>
        </div>
      </div>
    </div>
  );
}
