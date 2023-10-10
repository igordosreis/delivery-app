import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetProductsQuery } from '@/redux/api/services/productsSlice';
import useLogoutOnError from '@/services/useLogoutOnError';
import {
  BUTTON_ADD_ITEM,
  BUTTON_CART,
  BUTTON_RM_ITEM,
  CHECKOUT_BOTTOM_VALUE,
  CUSTOMER_PRODUCTS,
  ELM_CARD_PRICE,
  ELM_CARD_TITLE,
  IMG_CARD,
  INPUT_CARD_QUANTITY,
  PATH_CHECKOUT,
  PATH_CUSTOMER,
} from '@/constants';
import { addProduct, removeProduct } from '@/redux/features/cart/cartSlice';
import { ICart } from '@/interfaces/IProduct';

function Products() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isError, error } = useGetProductsQuery();
  const cart = useAppSelector((state) => state.reducer.cartSlice.cartData);
  useLogoutOnError(isError, error);

  // Handlers
  const handleAddButtonClick = ({
    currentTarget: {
      dataset: { id, productname, price },
    },
  }: React.MouseEvent<HTMLElement>) => {
    if (id && productname && price) {
      dispatch(addProduct({ id, productname, price }));
    }
  };

  const handleRemoveButtonClick = ({
    currentTarget: {
      dataset: { id },
    },
  }: React.MouseEvent<HTMLElement>) => {
    if (id) {
      dispatch(removeProduct({ id }));
    }
  };

  // const handleInputOnChange = ({
  //   target: {
  //     value,
  //     dataset: { id, name, price },
  //   },
  // }) => {
  //   const isInputZero = +value === 0;
  //   if (isInputZero) {
  //     return setProductQuantity((prevState) => {
  //       const { [id]: productRemovedFromCart, ...newState } = prevState;

  //       return newState;
  //     });
  //   }

  //   const isInputValidNumber = +value > 0;
  //   if (isInputValidNumber) {
  //     return setProductQuantity((prevState) => {
  //       const newState = {
  //         ...prevState,
  //         [id]: {
  //           quantity: +value,
  //           name,
  //           price,
  //           id,
  //         },
  //       };

  //       return newState;
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (isError && 'status' in error && !('error' in error)) {
  //     const errMsg = JSON.stringify(error.data);
  //     if (errMsg.toLowerCase().includes('token')) {
  //       dispatch(logout());
  //       router.push('/login');
  //     }
  //   }
  // }, [isError]);

  // useEffect(() => {
  //   const saveCart = () => {
  //     saveCartOnLocalStorage(productQuantity);
  //     dispatch(saveCartAcion(productQuantity));
  //   };
  //   saveCart();
  // }, [productQuantity]);

  // Rendering
  const renderProductsCards = () => {
    const productsCardsArray =
      data &&
      data.map(({ id, productName, price, urlImage }) => {
        const cartData: ICart = cart;
        const cartItem = cartData[id];

        const card = (
          <div key={id} className="product-card">
            <div
              data-testid={`${CUSTOMER_PRODUCTS}${ELM_CARD_PRICE}-${id}`}
              className="product-card-price"
            >
              {'R$ '}
              {price.replace('.', ',')}
            </div>
            {/* <img
              className="product-image"
              data-testid={`${CUSTOMER_PRODUCTS}${IMG_CARD}-${id}`}
              src={urlImage}
              alt={`${productName}-product`}
            /> */}
            <div className="product-card-bottom">
              <div
                data-testid={`${CUSTOMER_PRODUCTS}${ELM_CARD_TITLE}-${id}`}
                className="product-card-bottom-name"
              >
                {productName}
              </div>
              <div className="product-card-bottom-buttons">
                <button
                  data-testid={`${CUSTOMER_PRODUCTS}${BUTTON_RM_ITEM}-${id}`}
                  data-id={id}
                  type="button"
                  onClick={handleRemoveButtonClick}
                  className="product-card-bottom-button button-"
                >
                  -
                </button>
                <input
                  data-testid={`${CUSTOMER_PRODUCTS}${INPUT_CARD_QUANTITY}-${id}`}
                  data-id={id}
                  data-productname={productName}
                  data-price={price}
                  type="text"
                  onChange={() => {}}
                  value={(cartItem && cartItem.quantity) || 0}
                  className="product-card-bottom-0"
                />
                <button
                  data-testid={`${CUSTOMER_PRODUCTS}${BUTTON_ADD_ITEM}-${id}`}
                  data-id={id}
                  data-productname={productName}
                  data-price={price}
                  type="button"
                  onClick={handleAddButtonClick}
                  className="product-card-bottom-button button--"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );

        return card;
      });

    return productsCardsArray;
  };

  const renderCartPriceAndButton = () => {
    // const totalPrice = Object.values(productQuantity)
    //   .reduce((accTotalPrice, currProduct) => {
    //     const currTotalPrice = currProduct.quantity * currProduct.price;

    //     return accTotalPrice + currTotalPrice;
    //   }, 0)
    //   .toFixed(2)
    //   .replace('.', ',');
    // const isDisable = totalPrice === '0,00';

    return (
      <div className="cart-div">
        {/* <button
          data-testid={`${CUSTOMER_PRODUCTS}${BUTTON_CART}`}
          type="button"
          onClick={() => router.push(`/${PATH_CUSTOMER}/${PATH_CHECKOUT}`)}
          disabled={isDisable}
          className="cart"
        >
          {'Ver carrinho: '}
          <div data-testid={`${CUSTOMER_PRODUCTS}${CHECKOUT_BOTTOM_VALUE}`}>
            {'R$ '}
            {totalPrice}
          </div>
        </button> */}
      </div>
    );
  };

  return (
    <div>
      <div className="products-container">{data && renderProductsCards()}</div>
      {renderCartPriceAndButton()}
    </div>
  );
}

export default Products;
