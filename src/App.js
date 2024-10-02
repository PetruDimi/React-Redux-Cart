import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { putCartData, getCartData } from "./store/cart-thunks";

let componentOnMount = true;

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  useEffect(() => {
    if (componentOnMount) {
      componentOnMount = false;
      return;
    }
    if (cart.changed) {
      dispatch(putCartData(cart));
    }
  }, [cart, dispatch]);

  const testRequest = async () =>{
    const response = await fetch('https://react-http-requests-b1189-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
    if(!response.ok){
      throw new Error("Something went wrong!");
    }
    const data = response.json()
    return data
  }

  console.log(testRequest());
  

  return (
    <Fragment>
      {notification && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
