import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const cartBadgeAmount = useSelector(state=>state.cart.totalAmount)
  const dispatch = useDispatch()

  const toggleCartHandler = ()=>{
    dispatch(uiActions.toggleCart())
  }
  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartBadgeAmount}</span>
    </button>
  );
};

export default CartButton;
