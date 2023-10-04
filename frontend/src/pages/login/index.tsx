import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { IUser } from '@/interfaces/IUser';
import { useLoginUserMutation } from '@/redux/features/users/userSlice';
import {
  getUserDataOnLocalStorage,
  saveUserDataOnLocalStorage,
} from '@/services/handleLocalStorage';
import {
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
  const [loginUser, { data, isError, isSuccess, isUninitialized, status }] =
    useLoginUserMutation();
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

    const isUserAdmin = userData.role === ROLE_ADMIN;
    const isUserCustomer = userData.role === ROLE_CUSTOMER;
    const isUserSeller = userData.role === ROLE_SELLER;

    if (isUserAdmin) return router.push(`/${PATH_ADMIN}/${PATH_MANAGE}`);
    if (isUserCustomer) return router.push(`/${PATH_CUSTOMER}/${PATH_PRODUCTS}`);
    if (isUserSeller) return router.push(`/${PATH_SELLER}/${PATH_ORDERS}`);
  };

  // console.log('data outside: ', data);
  // console.log('isError outside: ', isError);
  // console.log('isSuccess outside: ', isSuccess);
  // console.log('isUninitialized outside: ', isUninitialized);
  // console.log('status outside: ', status);
  const handleLoginResponse = () => {
    // console.log('data inside: ', data);
    // console.log('isError inside: ', isError);
    // console.log('isSuccess inside: ', isSuccess);
    // console.log('isUninitialized inside: ', isUninitialized);
    // console.log('status inside: ', status);
    // console.log('payload any inside: ', payload);
    // const isLoginResponseValid = status === HTTP_OK;
    if (isSuccess) {
      saveUserDataAndGoToNextPage(data);
    } else {
      setUserIsNotFound(true);
    }
  };

  useEffect(() => {
    if (isSuccess || isError) {
      handleLoginResponse();
    }
  }, [isSuccess, isError]);

  const handleEnterButtonClick = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const request = { email: emailInput, password: passwordInput };

    await loginUser(request);
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
