import { ReactElement } from 'react';

import Layout from '@/components/Layout';
import OrderDetailsComponent from '@/components/OrderDetailsComponent';

export default function OrderSellerDetails() {
  return <OrderDetailsComponent />;
}

OrderSellerDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
