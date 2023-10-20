import { useRouter } from 'next/router';

import { useGetOrderByIdQuery } from '@/redux/api/services/ordersSlice';
import useLogoutOnError from '@/services/useLogoutOnError';
import { useAppSelector } from '@/redux/hooks';
import {
  CUSTOMER_ORDER_DETAILS,
  ELM_TABLE_NUMBER,
  ELM_TABLE_QUANTITY,
  ELM_TABLE_SUBTOTAL,
  ELM_TABLE_TOTAL_PRICE,
  ELM_TABLE_UNIT_PRICE,
  HTTP_OK,
  ROLE_SELLER,
  SELLER_ORDER_DETAILS,
} from '@/constants';

export default function OrderDetailsComponent() {
  const router = useRouter();
  const orderId = typeof router.query.id === 'string' ? router.query.id : '';
  const { data, isError, error } = useGetOrderByIdQuery(orderId);
  const user = useAppSelector((state) => state.reducer.authSlice.userData);
  useLogoutOnError(isError, error);
  // console.log('data: ', data);

  const isSeller = user?.role === ROLE_SELLER;
  const PREFIX = isSeller ? SELLER_ORDER_DETAILS : CUSTOMER_ORDER_DETAILS;

  return (
    <main className="main-order-table">
      <table>
        <thead>
          <tr className="tr-table">
            <th className="th-table1">Item</th>
            <th className="th-table2">Descrição</th>
            <th className="th-table3">Quantidade</th>
            <th className="th-table4">Valor Unitário</th>
            <th className="th-table5">Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {data?.products.map((productInfo, index) => {
            const {
              quantity,
              product: { id, productName, price },
            } = productInfo;
            return (
              <tr className="tr-table-result" key={id}>
                <td
                  className="tr-table-result1"
                  data-testid={`${PREFIX}${ELM_TABLE_NUMBER}-${index}`}
                >
                  {index + 1}
                </td>
                <td
                  className="tr-table-result2"
                  data-testid={`${PREFIX}${ELM_TABLE_NUMBER}-${index}`}
                >
                  {productName}
                </td>
                <td
                  className="tr-table-result3"
                  data-testid={`${PREFIX}${ELM_TABLE_QUANTITY}-${index}`}
                >
                  {quantity}
                </td>
                <td
                  className="tr-table-result4"
                  data-testid={`${PREFIX}${ELM_TABLE_UNIT_PRICE}-${index}`}
                >
                  {price.replace('.', ',')}
                </td>
                <td
                  className="tr-table-result5"
                  data-testid={`${PREFIX}${ELM_TABLE_SUBTOTAL}-${index}`}
                >
                  {/* {setSubTotal(price, quantity)} */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="tot-price" data-testid={`${PREFIX}${ELM_TABLE_TOTAL_PRICE}`}>
        {`Total: R$ ${data?.totalPrice.replace('.', ',') || ''}`}
      </p>
    </main>
    // <div>teste</div>
  );
}
