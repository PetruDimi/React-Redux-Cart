import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.id}
              item={{
                title: cartItem.title,
                amount: cartItem.amount,
                price: cartItem.price,
                id: cartItem.id,
              }}
            />
          );
        })}
      </ul>
      <h1>
        Total Price:
        <div>{`$${totalPrice}`}</div>
      </h1>
    </Card>
  );
};

export default Cart;
