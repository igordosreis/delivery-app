import Link from 'next/link';

import { useAppSelector } from '@/redux/hooks';
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

export default function Navbar() {
  const user = useAppSelector((state) => state.reducer.authSlice.userData);

  // Handlers
  const handleLogoutButtonClick = () => {
    logoutUser();
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
    <header>
      {renderLinks()}
      {renderUserName()}
      {renderLogoutButton()}
    </header>
  );
}
