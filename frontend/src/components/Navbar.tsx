import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/redux/features/auth/authSlice';
import {
  CUSTOMER_PRODUCTS,
  ELM_NAV_LOGOUT,
  ELM_NAV_ORDERS,
  ELM_NAV_PRODUCTS,
  ELM_NAV_USERNAME,
  PATH_ADMIN,
  PATH_CUSTOMER,
  PATH_LOGIN,
  PATH_MANAGE,
  PATH_ORDERS,
  PATH_SELLER,
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_SELLER,
} from '@/constants';
import ChildrenProps from '@/interfaces/Children';
import { deliveryApi } from '@/redux/api/apiSlice';

export default function Navbar({ children }: ChildrenProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.reducer.authSlice.userData);

  // Handlers
  const handleLogoutButtonClick = () => {
    dispatch(logoutUser());
    dispatch(deliveryApi.util.resetApiState());
    router.replace(`/${PATH_LOGIN}`);
  };

  // Rendering
  const currentUser = {
    isAdmin: user?.role === ROLE_ADMIN,
    isCustomer: user?.role === ROLE_CUSTOMER,
    isSeller: user?.role === ROLE_SELLER,
  };

  const renderLinks = () => (
    <div className="nav-link">
      <Link
        className="nav-link a"
        id="5"
        data-testid={`${CUSTOMER_PRODUCTS}${ELM_NAV_ORDERS}`}
        href={
          (currentUser.isCustomer && `/${PATH_CUSTOMER}/${PATH_ORDERS}`) ||
          (currentUser.isSeller && `/${PATH_SELLER}/${PATH_ORDERS}`) ||
          (currentUser.isAdmin && `/${PATH_ADMIN}/${PATH_MANAGE}`) ||
          ''
        }
      >
        {currentUser.isCustomer && 'Meus pedidos'}
        {currentUser.isSeller && 'Pedidos'}
        {currentUser.isAdmin && 'Gerenciar Usuários'}
      </Link>
      {currentUser.isCustomer && (
        <Link
          data-testid={`${CUSTOMER_PRODUCTS}${ELM_NAV_PRODUCTS}`}
          href="/customer/products"
          className="nav-link a"
          id="6"
        >
          Produtos
        </Link>
      )}
    </div>
  );

  const renderLogoutButton = () => (
    <button
      className="nav-button"
      data-testid={`${CUSTOMER_PRODUCTS}${ELM_NAV_LOGOUT}`}
      type="button"
      onClick={handleLogoutButtonClick}
    >
      Sair
    </button>
  );

  const renderUserName = () => (
    <div
      className="nav-name"
      data-testid={`${CUSTOMER_PRODUCTS}${ELM_NAV_USERNAME}`}
    >
      {user?.userName || ''}
    </div>
  );

  return (
    <>
      <header>
        {renderLinks()}
        {renderUserName()}
        {renderLogoutButton()}
      </header>
      {children}
    </>
  );
}
