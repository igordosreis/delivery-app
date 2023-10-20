import { useRouter } from 'next/router';

import {
  useGetOrderByIdQuery,
  usePatchOrderStatusMutation,
} from '@/redux/api/services/ordersSlice';
import useLogoutOnError from '@/services/useLogoutOnError';
import { useAppSelector } from '@/redux/hooks';
import {
  ELM_TABLE_NUMBER,
  ELM_TABLE_QUANTITY,
  ELM_TABLE_SUBTOTAL,
  ELM_TABLE_TOTAL_PRICE,
  ELM_TABLE_UNIT_PRICE,
  HTTP_OK,
  BUTTON_DELIVERY_CHECK,
  BUTTON_DISPATCH_CHECK,
  BUTTON_PREPARING_CHECK,
  CUSTOMER_ORDER_DETAILS,
  DELIVERY_DELIVERED,
  ELM_DETAILS_DELIVERY_STATUS,
  ELM_DETAILS_ORDER_DATE,
  ELM_DETAILS_ORDER_ID,
  ELM_DETAILS_SELLER_NAME,
  HTTP_UPDATED,
  DELIVERY_IN_TRANSIT,
  DELIVERY_PENDING,
  DELIVERY_PREPARING,
  ROLE_SELLER,
  SELLER_ORDER_DETAILS,
} from '@/constants';

export default function OrderDetailsComponent() {
  const router = useRouter();
  const orderId = typeof router.query.id === 'string' ? router.query.id : '';
  const { data, isError, error } = useGetOrderByIdQuery(orderId);
  const user = useAppSelector((state) => state.reducer.authSlice.userData);
  const [patchOrderStatus] = usePatchOrderStatusMutation();
  useLogoutOnError(isError, error);
  // console.log('data: ', data);

  const isSeller = user?.role === ROLE_SELLER;
  const PREFIX = isSeller ? SELLER_ORDER_DETAILS : CUSTOMER_ORDER_DETAILS;

  // Handlers
  const updateStatus = () => {
    switch (data?.status) {
      case DELIVERY_PENDING:
        return DELIVERY_PREPARING;
      case DELIVERY_PREPARING:
        return DELIVERY_IN_TRANSIT;
      case DELIVERY_IN_TRANSIT:
        return DELIVERY_DELIVERED;
      default:
        return null;
    }
  };

  const handleUpdateStatusButtonClick = async () => {
    const status = updateStatus();
    if (status) await patchOrderStatus({ orderId, status });
  };

  // Rendering
  const formatSubTotal = (price: string, quantity: string | number) => {
    const subTotal = `${(+price * +quantity).toFixed(2)}`.replace('.', ',');

    return subTotal;
  };

  const formatLeadingZeroes = (num: number | string = '') =>
    String(num).padStart(4, '0');

  const formatDate = (date: string = '') => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });

    return formattedDate;
  };

  const renderOrderInfo = () => (
    <>
      <p className="txt-pedido" data-testid={`${PREFIX}${ELM_DETAILS_ORDER_ID}`}>
        {`PEDIDO ${formatLeadingZeroes(data?.id)}`}
      </p>
      {!isSeller && (
        <p
          className="txt-pedido4"
          data-testid={`${PREFIX}${ELM_DETAILS_SELLER_NAME}`}
        >
          {`P. Vend: ${data?.sellerName}`}
        </p>
      )}
      <p className="txt-pedido2" data-testid={`${PREFIX}${ELM_DETAILS_ORDER_DATE}`}>
        {formatDate(data?.orderDate)}
      </p>
      <p
        className="txt-pedido3"
        data-testid={`${PREFIX}${ELM_DETAILS_DELIVERY_STATUS}`}
      >
        {data?.status}
        {/* {status.toUpperCase()} */}
      </p>
      {isSeller && (
        <button
          className="button-pedido"
          data-testid={`${PREFIX}${BUTTON_PREPARING_CHECK}`}
          type="button"
          disabled={data?.status !== DELIVERY_PENDING}
          onClick={handleUpdateStatusButtonClick}
        >
          PREPARAR PEDIDO
        </button>
      )}
      <button
        className="button-pedido"
        data-testid={
          isSeller
            ? `${PREFIX}${BUTTON_DISPATCH_CHECK}`
            : `${PREFIX}${BUTTON_DELIVERY_CHECK}`
        }
        type="button"
        disabled={
          isSeller
            ? data?.status !== 'Preparando'
            : data?.status !== DELIVERY_IN_TRANSIT
        }
        onClick={handleUpdateStatusButtonClick}
      >
        {isSeller ? 'SAIU PARA ENTREGA' : 'MARCAR COMO ENTREGUE'}
      </button>
    </>
  );

  const renderProductsInfoTable = () => (
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
                {formatSubTotal(price, quantity)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderTotalPrice = () => (
    <p className="tot-price" data-testid={`${PREFIX}${ELM_TABLE_TOTAL_PRICE}`}>
      {`Total: R$ ${data?.totalPrice.replace('.', ',') || ''}`}
    </p>
  );

  return (
    <>
      <section className="section-order">{renderOrderInfo()}</section>
      <section className="main-order-table">
        {renderProductsInfoTable()}
        {renderTotalPrice()}
      </section>
    </>
  );
}
