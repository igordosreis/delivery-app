import { ReactElement } from 'react';

import Layout from '@/components/Layout';
import OrderDetailsComponent from '@/components/OrderDetailsComponent';

export default function OrderDetails() {
  return <OrderDetailsComponent />;
}

OrderDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
