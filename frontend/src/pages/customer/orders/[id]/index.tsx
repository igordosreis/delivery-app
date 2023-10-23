import { ReactElement } from 'react';

import Layout from '@/components/Layout';
import OrderDetailsComponent from '@/components/OrderDetailsComponent';

export default function OrderCustomerDetails() {
  return <OrderDetailsComponent />;
}

OrderCustomerDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
