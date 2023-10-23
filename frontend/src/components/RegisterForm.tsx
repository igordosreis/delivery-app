import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { HTTP_CREATED } from '@/constants';
import { RegisterProps } from '@/interfaces/Components';
import {
  useCreateNewUserMutation,
  useRegisterNewUserMutation,
} from '@/redux/api/services/userSlice';

export default function RegisterFormComponent({ isRegisterPage }: RegisterProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.reducer.authSlice.userData);
  const [registerUser] = useRegisterNewUserMutation();
  const [createNewUser] = useCreateNewUserMutation();
  const [user, setUser] = useState({ userName: '', email: '', password: '' });
  const [role, setRole] = useState('seller');
  const [existingUser, setExistingUser] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [open, setOpen] = useState(false);

  // Validation
  const validateInputFields = () => {
    const validEmailRegex = /\S+@\S+\.\S+/i;
    const isEmailValid = validEmailRegex.test(user.email);

    const minPassword = 6;
    const isPasswordValid = user.password.length >= minPassword;

    const minName = 3;
    const isNameValid = user.userName.length >= minName;

    const areAllInputsValid = !(isEmailValid && isPasswordValid && isNameValid);

    return areAllInputsValid;
  };

  const isButtonDisabled = validateInputFields();

  // Handlers
  const handleInputOnChange = async ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [name]: value });
  };

  const handleSelectOnChange = async ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    setRole(value);
  };

  const handleRegisterUserOnSubmit = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await registerUser(user).unwrap();
    } catch (error) {
      setExistingUser(true);
      const errMsg = JSON.stringify(error).toLowerCase();
      if (errMsg.includes('email')) {
        setMessageError('Email já cadastrado.');
      } else {
        setMessageError('Nome de usuário já cadastrado.');
      }
    }
  };

  const handleCreateUserOnSubmit = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const newUserData = { ...user, role };
    try {
      const response = await createNewUser(newUserData);
    } catch (error) {
      setExistingUser(true);
      const errMsg = JSON.stringify(error).toLowerCase();
      if (errMsg.includes('email')) {
        setMessageError('Email já cadastrado.');
      } else {
        setMessageError('Nome de usuário já cadastrado.');
      }
    }
  };

  return (
    <>
      {!isRegisterPage && (
        <button onClick={() => setOpen(!open)} type="button" className="accordion">
          <div className={`accordion-${open}`}>
            <p>Cadastrar novo usuário</p>
          </div>
        </button>
      )}
      {isRegisterPage && (
        <header className="lr-header">
          <div className="header-content">
            {/* <img
               src="https://i.imgur.com/4nEw7Wb.png"
              alt="logo"
              className="logo-img"
            /> */}
            <h1>Dona Tereza</h1>
          </div>
        </header>
      )}
      <div className={isRegisterPage ? 'lr-content' : `adm-form-${open}`}>
        {isRegisterPage ? (
          <h1>Cadastro</h1>
        ) : (
          <h3 className="adm-form-title">Cadastrar novo usuário</h3>
        )}
        <form
          className={isRegisterPage ? 'lr-form' : 'adm-form'}
          onSubmit={
            isRegisterPage ? handleRegisterUserOnSubmit : handleCreateUserOnSubmit
          }
        >
          <label htmlFor="Nome">
            <input
              className="txt-box"
              id="userName"
              name="userName"
              type="text"
              onChange={handleInputOnChange}
              data-testid={
                isRegisterPage
                  ? 'common_register__input-name'
                  : 'admin_manage__input-name'
              }
              placeholder={isRegisterPage ? 'Seu nome' : 'Nome do usuário'}
            />
          </label>
          <label htmlFor="email">
            <input
              className="txt-box"
              type="text"
              id="email"
              data-testid={
                isRegisterPage
                  ? 'common_register__input-email'
                  : 'admin_manage__input-email'
              }
              name="email"
              onChange={handleInputOnChange}
              placeholder={isRegisterPage ? 'Seu e-mail' : 'E-mail do usuário'}
            />
          </label>
          <label htmlFor="password">
            <input
              placeholder="senha"
              className="txt-box"
              id="password"
              type="password"
              onChange={handleInputOnChange}
              data-testid={
                isRegisterPage
                  ? 'common_register__input-password'
                  : 'admin_manage__input-password'
              }
              name="password"
            />
          </label>
          {!isRegisterPage && (
            <label htmlFor="role">
              <select
                name="role"
                id="role"
                data-testid="admin_manage__select-role"
                value={role}
                onChange={handleSelectOnChange}
              >
                <option value="seller">Vendedor</option>
                <option value="customer">Cliente</option>
                <option value="administrator">Administrador</option>
              </select>
            </label>
          )}
          <button
            disabled={isButtonDisabled}
            type="submit"
            className="finish-btn"
            data-testid={
              isRegisterPage
                ? 'common_register__button-register'
                : 'admin_manage__button-register'
            }
          >
            Cadastrar
          </button>
        </form>
      </div>
      {existingUser && (
        <h2
          data-testid={
            isRegisterPage
              ? 'common_register__element-invalid_register'
              : 'admin_manage__element-invalid-register'
          }
        >
          {messageError}
        </h2>
      )}
    </>
  );
}
