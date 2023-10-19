import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  CUSTOMER_ORDERS,
  ELM_CARD_ADDRESS,
  ELM_CARD_PRICE,
  ELM_DELIVERY_STATUS,
  ELM_ORDER_DATE,
  ELM_ORDER_ID,
  HTTP_OK,
  PATH_CUSTOMER,
  PATH_ORDERS,
  PATH_SELLER,
  ROLE_SELLER,
  SELLER_ORDERS,
  NUM_TENTH_CARD,
} from '@/constants';
import { useGetOrdersQuery } from '@/redux/api/services/ordersSlice';
import useLogoutOnError from '@/services/useLogoutOnError';

function OrdersComponent() {
  // const router = useRouter();
  // const dispatch = useAppDispatch();
  const { data, isError, error } = useGetOrdersQuery();
  const user = useAppSelector((state) => state.reducer.authSlice.userData);
  useLogoutOnError(isError, error);
  // const [sales, setSales] = useState([]);

  const isSeller = user?.role === ROLE_SELLER;
  // const PREFIXE = isSeller ? SELLER_ORDERS : CUSTOMER_ORDERS;

  // Rendering
  const formatOrderIdLink = (id: number) =>
    `${
      isSeller
        ? `/${PATH_SELLER}/${PATH_ORDERS}/${id}`
        : `/${PATH_CUSTOMER}/${PATH_ORDERS}/${id}`
    }`;

  const formatLeadingZeroes = (num: number) => String(num).padStart(4, '0');

  const formatPrice = (totalPrice: string) => `R$ ${totalPrice.replace('.', ',')}`;

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });

    return formattedDate;
  };

  const renderAddressInfo = (deliveryAddress: string, deliveryNumber: string) =>
    isSeller && <div>{`${deliveryAddress}, ${deliveryNumber}`}</div>;

  const renderOrdersCards = () => {
    const ordersCardsArray =
      data &&
      data.map(
        ({ id, deliveryAddress, deliveryNumber, status, orderDate, totalPrice }) => {
          const card = (
            <Link href={formatOrderIdLink(id)}>
              <div>
                <div>
                  <p>Pedido</p>
                  <p>{formatLeadingZeroes(id)}</p>
                </div>
                <div>
                  <div>{status}</div>
                  <div>{formatDate(orderDate)}</div>
                  <div>{formatPrice(totalPrice)}</div>
                  {renderAddressInfo(deliveryAddress, deliveryNumber)}
                </div>
              </div>
            </Link>
          );

          return card;
        }
      );

    return ordersCardsArray;
  };

  return <main>{data && renderOrdersCards()}</main>;
}

export default OrdersComponent;
