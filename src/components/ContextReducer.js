import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Check if the item already exists in the cart
      const existingItem = state.find(item => item.id === action.id && item.size === action.size);
      
      if (existingItem) {
        // If item exists, update its quantity and price
        return state.map(item =>
          item.id === action.id && item.size === action.size
            ? { ...item, qty: parseInt(item.qty) + parseInt(action.qty), price: item.price + action.price }
            : item
        );
      } else {
        // If item does not exist, add it
        return [
          ...state,
          {
            id: action.id,
            name: action.name,
            qty: action.qty,
            size: action.size,
            price: action.price,
            photo: action.photo,
          },
        ];
      }

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    case "UPDATE":
      // Update item quantity and price based on id and size
      return state.map(food =>
        food.id === action.id && food.size === action.size
          ? { ...food, qty: parseInt(action.qty), price: action.price }
          : food
      );
      case "DROP":
      let empArray=[]
      return empArray

    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
