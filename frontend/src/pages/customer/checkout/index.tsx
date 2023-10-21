import React, { ReactElement, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import SelectWithOptions from '@/components/SelectWithOptions';
import {
  BUTTON_SUBMIT_ORDER,
  CUSTOMER_CHECKOUT,
  ELM_TABLE_NAME,
  ELM_TABLE_NUMBER,
  ELM_TABLE_QUANTITY,
  ELM_TABLE_REMOVE,
  ELM_TABLE_SUBTOTAL,
  ELM_TABLE_TOTAL_PRICE,
  ELM_TABLE_UNIT_PRICE,
  INPUT_ADDRESS,
  INPUT_ADDRESS_NUMBER,
  PATH_CUSTOMER,
  PATH_ORDERS,
  SELECT_SELLER,
} from '@/constants';
import { useGetSellersQuery } from '@/redux/api/services/userSlice';
import { deleteProduct, emptyCart } from '@/redux/features/cart/cartSlice';
import { usePostOrderMutation } from '@/redux/api/services/ordersSlice';
import { IOrderRequest } from '@/interfaces/IOrders';
import useLogoutOnError from '@/services/useLogoutOnError';
import Layout from '@/components/Layout';

function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isError, error } = useGetSellersQuery();
  const [postOrder] = usePostOrderMutation();
  const cart = useAppSelector((state) => state.reducer.cartSlice.cartData);
  const [sellerId, setSellerId] = useState(+'');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  // Validations
  useLogoutOnError(isError, error);
  const isDisabled = !(sellerId && deliveryAddress && deliveryNumber);

  // Handlers
  const handleRemoveButtonCLick = ({
    currentTarget: {
      dataset: { id },
    },
  }: React.MouseEvent<HTMLElement>) => {
    if (id) {
      dispatch(deleteProduct({ id }));
    }
  };

  const handleSellerSelectOnChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) =>
    setSellerId(+value);

  const handleAddressInputOnChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setDeliveryAddress(value);

  const handleAddressNumberInputOnChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const isInputValidNumber = +value >= 0 || value === '';
    if (isInputValidNumber) setDeliveryNumber(value);
  };

  const totalPrice = useMemo(
    () =>
      Object.values(cart)
        .reduce((accTotal, currProduct) => {
          const currTotal = +currProduct.price * currProduct.quantity;

          return accTotal + currTotal;
        }, 0)
        .toFixed(2),
    [cart]
  );

  const handleSubmitOrder = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const products = Object.values(cart).map(({ id, quantity }) => ({
      id,
      quantity,
    }));
    const orderRequest: IOrderRequest = {
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber: `${deliveryNumber}`,
      products,
    };

    try {
      const { id } = await postOrder(orderRequest).unwrap();
      dispatch(emptyCart());
      router.push(`/${PATH_CUSTOMER}/${PATH_ORDERS}/${id}`);
    } catch (error) {
      setIsErrorMessage(true);
    }
  };

  // Rendering
  const renderRemoveProductButton = (index: number, id: string | number) => (
    <button
      data-testid={`${CUSTOMER_CHECKOUT}${ELM_TABLE_REMOVE}-${index}`}
      data-id={id}
      type="button"
      onClick={handleRemoveButtonCLick}
    >
      Remover
    </button>
  );

  const renderProductsForCheckoutTable = () => {
    const productsFromCartArray = Object.values(cart);
    // const productsFromCartArray = [...Object.values(currentCart || {})].reverse();
    const productsForCheckoutArray = productsFromCartArray.map(
      ({ id, productname, price, quantity }, index) => {
        const adjustedIndex = index + 1;
        const subTotal = (+price * quantity).toFixed(2).replace('.', ',');

        const product = (
          <tr key={id} className="td-line">
            <td
              data-testid={`${CUSTOMER_CHECKOUT}${ELM_TABLE_NUMBER}-${index}`}
              className="td-item"
            >
              {adjustedIndex}
            </td>
            <td
              data-testid={`${CUSTOMER_CHECKOUT}${ELM_TABLE_NAME}-${index}`}
              className="td-name"
            >
              {productname}
            </td>
            <td
              data-testid={`${CUSTOMER_CHECKOUT}${ELM_TABLE_QUANTITY}-${index}`}
              className="td-quantity"
            >
              {quantity}
            </td>
            <td
              data-testid={`${CUSTOMER_CHECKOUT}${ELM_TABLE_UNIT_PRICE}-${index}`}
              className="td-price"
            >
              {price.replace('.', ',')}
            </td>
            <td
              data-testid={`${CUSTOMER_CHECKOUT}${ELM_TABLE_SUBTOTAL}-${index}`}
              className="td-subtotal"
            >
              {subTotal}
            </td>
            <td className="td-button">{renderRemoveProductButton(index, id)}</td>
          </tr>
        );

        return product;
      }
    );

    const productsTable = (
      <table className="table-checkout">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>{productsForCheckoutArray}</tbody>
      </table>
    );

    return productsTable;
  };

  const renderTotalPrice = () => (
    <div className="total-price">
      <span>{'Total: '}</span>
      <span data-testid={`${CUSTOMER_CHECKOUT}${ELM_TABLE_TOTAL_PRICE}`}>
        {totalPrice.replace('.', ',')}
      </span>
    </div>
  );

  const renderForm = () => (
    <div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <div className="form-checkout-complete">
        <form onSubmit={handleSubmitOrder} className="form-checkout">
          <SelectWithOptions
            dataTestId={`${CUSTOMER_CHECKOUT}${SELECT_SELLER}`}
            data={data || []}
            name="seller"
            id="seller"
            value={sellerId}
            onChange={handleSellerSelectOnChange}
            className="form-select"
            placeholder="Vendedora Responsável"
          />
          <input
            data-testid={`${CUSTOMER_CHECKOUT}${INPUT_ADDRESS}`}
            type="text"
            name="address"
            value={deliveryAddress}
            onChange={handleAddressInputOnChange}
            className="txt-box"
            placeholder="Endereço"
          />
          <input
            data-testid={`${CUSTOMER_CHECKOUT}${INPUT_ADDRESS_NUMBER}`}
            type="text"
            name="addressNumber"
            value={deliveryNumber}
            onChange={handleAddressNumberInputOnChange}
            className="txt-box"
            placeholder="Número"
          />
          <button
            data-testid={`${CUSTOMER_CHECKOUT}${BUTTON_SUBMIT_ORDER}`}
            type="submit"
            disabled={isDisabled}
            className="checkout-button"
          >
            FINALIZAR PEDIDO
          </button>
        </form>
      </div>
    </div>
  );

  const renderErrorMsg = () =>
    isErrorMessage && (
      <div>Ocorreu um problema inesperado. Por favor tente novamente em breve.</div>
    );

  return (
    <>
      <div>
        <h3>Finalizar Pedido</h3>
        <div className="table-checkout-container">
          {renderProductsForCheckoutTable()}
          {renderTotalPrice()}
          {renderForm()}
          {renderErrorMsg()}
        </div>
      </div>
    </>
  );
}

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CheckoutPage;
