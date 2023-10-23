// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { HTTP_CREATED } from '@/constants';

// export default function FormRegister({ register }) {
//   const router = useRouter();
//   const [user, setUser] = useState({ name: '', email: '', password: '' });
//   const [existingUser, setExistingUser] = useState(false);
//   const [role, setRole] = useState('seller');
//   const [messageError, setMessageError] = useState('');
//   const [isButtonDisabled, setButtonDisabled] = useState(true);
//   const userData = useAppSelector((state) => state.reducer.authSlice.userData);
//   const [open, setOpen] = useState(false);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const validEmailRegex = /\S+@\S+\.\S+/i;
//     const minPassword = 6;
//     const isPasswordValid = user.password.length >= minPassword;
//     const minName = 12;
//     const isNameValid = user.name.length >= minName;

//     if (validEmailRegex.test(user.email) && isPasswordValid && isNameValid) {
//       setButtonDisabled(false);
//     } else {
//       setButtonDisabled(true);
//     }
//   }, [user]);

//   const handleInputChange = async ({ target: { name, value } }) => {
//     setUser({ ...user, [name]: value });
//   };

//   const signUp = async (e) => {
//     e.preventDefault();
//     const response = await postRegister(user);
//     if (response.status === HTTP_CREATED) {
//       saveUserDataOnLocalStorage(response.data);
//       router.push('/customer/products');
//     } else {
//       setExistingUser(true);
//       setMessageError(response.data);
//     }
//   };

//   const createUser = async (e) => {
//     e.preventDefault();
//     const newUserData = { ...user, role };
//     const response = await postUser(newUserData);
//     if (response.status === HTTP_CREATED) {
//       dispatch(getUsersAction(true));
//     } else {
//       setExistingUser(true);
//       setMessageError(response.data);
//     }
//   };

//   return (
//     <>
//       {!register && (
//         <button
//           onClick={ () => setOpen(!open) }
//           type="button"
//           className="accordion"
//         >
//           <div className={ `accordion-${open}` }>
//             <p>Cadastrar novo usuário</p>
//           </div>
//         </button>
//       )}
//       {register && (
//         <header className="lr-header">
//           <div className="header-content">
//             <img src="https://i.imgur.com/4nEw7Wb.png" alt="logo" className="logo-img" />
//             <h1>Dona Tereza</h1>
//           </div>
//         </header>
//       )}
//       <div className={ register ? 'lr-content' : `adm-form-${open}` }>
//         {register
//           ? (<h1>Cadastro</h1>)
//           : (<h3 className="adm-form-title">Cadastrar novo usuário</h3>) }
//         <form
//           className={ register ? 'lr-form' : 'adm-form' }
//           onSubmit={register ? signUp : createUser }
//         >
//           <label htmlFor="Nome">
//             <input
//               className="txt-box"
//               id="name"
//               type="text"
//               onChange={ handleInputChange }
//               data-testid={ register
//                 ? 'common_register__input-name'
//                 : 'admin_manage__input-name' }
//               name="name"
//               placeholder={ register ? 'Seu nome' : 'Nome do usuário' }
//             />
//           </label>
//           <label htmlFor="email">
//             <input
//               className="txt-box"
//               type="text"
//               id="email"
//               data-testid={ register
//                 ? 'common_register__input-email'
//                 : 'admin_manage__input-email' }
//               name="email"
//               onChange={ handleInputChange }
//               placeholder={ register ? 'Seu e-mail' : 'E-mail do usuário' }
//             />
//           </label>
//           <label htmlFor="password">
//             <input
//               placeholder="senha"
//               className="txt-box"
//               id="password"
//               type="password"
//               onChange={ handleInputChange }
//               data-testid={ register
//                 ? 'common_register__input-password'
//                 : 'admin_manage__input-password' }
//               name="password"
//             />
//           </label>
//           {!register && (
//             <label htmlFor="role">
//               <select
//                 name="role"
//                 id="role"
//                 data-testid="admin_manage__select-role"
//                 value={ role }
//                 onChange={ setRole }
//               >
//                 <option value="seller">Vendedor</option>
//                 <option value="customer">Cliente</option>
//                 <option value="administrator">Administrador</option>
//               </select>
//             </label>
//           )}
//           <button
//             disabled={ isButtonDisabled }
//             type="submit"
//             className="finish-btn"
//             data-testid={ register
//               ? 'common_register__button-register'
//               : 'admin_manage__button-register' }
//           >
//             Cadastrar
//           </button>
//         </form>
//       </div>
//       { existingUser && (
//         <h2
//           data-testid={ register
//             ? 'common_register__element-invalid_register'
//             : 'admin_manage__element-invalid-register' }
//         >
//           {messageError}
//         </h2>
//       )}
//     </>
//   );
// }
