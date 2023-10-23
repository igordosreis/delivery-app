import { ReactElement } from 'react';

import AdminTable from '@/components/AdminTable';
import Layout from '@/components/Layout';
import RegisterFormComponent from '@/components/RegisterForm';

export default function AdminPage() {
  return (
    <>
      <RegisterFormComponent isRegisterPage={false} />
      <AdminTable />
    </>
  );
}

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
