import { ReactElement } from 'react';

import Layout from '@/components/Layout';
import OrdersComponent from '@/components/OrdersComponent';

export default function OrdersCustomerPage() {
  return <OrdersComponent />;
}

OrdersCustomerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
