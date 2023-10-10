import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { useAppSelector } from '@/redux/hooks';
import { useGetProductsQuery } from '@/redux/api/services/productsSlice';
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
import useLogoutOnError from '@/services/useLogoutOnError';

// import { saveCartAcion } from '../../redux/actions';
// import { saveCartOnLocalStorage } from '../../services/handleLocalStorage';

function Products() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isError, error } = useGetProductsQuery();
  const cart = useAppSelector((state) => state.reducer.cartSlice.cartData);
  useLogoutOnError(isError, error);
  // const [data] = useAuthFetch(getProducts);
  // const {
  //   cart: { currentCart },
  // } = useSelector((state) => state);
  // const [productQuantity, setProductQuantity] = useState(currentCart);
  // console.log('data: ', data);
  // console.log('error: ', error);
  // console.log('isLoading: ', isLoading);
  // Handlers
  // const handleAddButtonClick = ({
  //   target: {
  //     dataset: { id, name, price },
  //   },
  // }) => {
  //   setProductQuantity((prevState) => {
  //     const newState = {
  //       ...prevState,
  //       [id]: {
  //         quantity: (prevState[id]?.quantity || 0) + 1,
  //         name,
  //         price,
  //         id,
  //       },
  //     };

  //     return newState;
  //   });
  // };

  // const handleRemoveButtonClick = ({
  //   target: {
  //     dataset: { id },
  //   },
  // }) => {
  //   setProductQuantity((prevState) => {
  //     const isProductInCart = prevState[id]?.quantity;
  //     const newQuantity = isProductInCart ? prevState[id].quantity - 1 : 0;

  //     const isProductStillInCart = newQuantity > 0;
  //     if (isProductStillInCart) {
  //       const newState = {
  //         ...prevState,
  //         [id]: {
  //           ...prevState[id],
  //           quantity: newQuantity,
  //         },
  //       };

  //       return newState;
  //     }
  //     const { [id]: productRemovedFromCart, ...newState } = prevState;

  //     return newState;
  //   });
  // };

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
  //     // executeLogout(router);
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
                  // onClick={handleRemoveButtonClick}
                  className="product-card-bottom-button button-"
                >
                  -
                </button>
                <input
                  data-testid={`${CUSTOMER_PRODUCTS}${INPUT_CARD_QUANTITY}-${id}`}
                  data-id={id}
                  data-name={productName}
                  data-price={price}
                  type="text"
                  // onChange={handleInputOnChange}
                  // value={productQuantity[id]?.quantity || 0}
                  className="product-card-bottom-0"
                />
                <button
                  data-testid={`${CUSTOMER_PRODUCTS}${BUTTON_ADD_ITEM}-${id}`}
                  data-id={id}
                  data-name={productName}
                  data-price={price}
                  type="button"
                  // onClick={handleAddButtonClick}
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
