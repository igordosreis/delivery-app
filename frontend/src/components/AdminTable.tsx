import React from 'react';

import { HTTP_DELETED, HTTP_OK, ROLE_CUSTOMER, ROLE_SELLER } from '@/constants';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '@/redux/api/services/userSlice';
import useLogoutOnError from '@/services/useLogoutOnError';

export default function AdminTable() {
  const { data, isError, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  useLogoutOnError(isError, error);

  // Handlers
  const handleDeleteUserOnClick = async ({
    currentTarget: {
      dataset: { id },
    },
  }: React.MouseEvent<HTMLElement>) => {
    try {
      if (id) deleteUser(id).unwrap();
    } catch (error) {}
  };

  // Rendering
  const formatRole = (role: string) => {
    switch (role) {
      case ROLE_SELLER:
        return 'P. Vendedora';
      case ROLE_CUSTOMER:
        return 'Cliente';
      default:
        return null;
    }
  };

  return (
    <section className="table-adm-container">
      <h3>Lista de usuários</h3>
      <table className="table-adm">
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ id, userName, email, role }, index) => (
            <tr key={id}>
              <td
                className="td-item"
                data-testid={`admin_manage__element-user-table-item-number-${index}`}
              >
                {index + 1}
              </td>
              <td
                className="td-name"
                data-testid={`admin_manage__element-user-table-name-${index}`}
              >
                {userName}
              </td>
              <td
                className="td-email"
                data-testid={`admin_manage__element-user-table-email-${index}`}
              >
                {email}
              </td>
              <td
                className="td-role"
                data-testid={`admin_manage__element-user-table-role-${index}`}
              >
                {formatRole(role)}
              </td>
              <td className="td-button">
                <button
                  type="button"
                  data-testid={`admin_manage__element-user-table-remove-${index}`}
                  data-id={id}
                  onClick={handleDeleteUserOnClick}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
