import { createContext, useContext, useMemo, useState } from "react";
import {
  getBookingCart,
  addToBookingCart,
  increaseBookingCartQty,
  decreaseBookingCartQty,
  removeFromBookingCart,
  clearBookingCart,
} from "../utils/localStorage";
import { useToast } from "./ToastContext";

const GST_RATE = 0.05; // 5% GST
const SERVICE_CHARGE_RATE = 0.05; // 5% optional service charge

const BookingCartContext = createContext();

// Manages the list of menu items a user has selected for their table booking.
// This is NOT an online ordering system — items are only attached to a table reservation.
export const BookingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getBookingCart());
  const [includeServiceCharge, setIncludeServiceCharge] = useState(false);
  const { showToast } = useToast() || {};

  const addItem = (menuItem) => {
    const updated = addToBookingCart(menuItem);
    setCartItems(updated);
    showToast?.(`${menuItem.name} added to your booking`, "success");
  };

  const increaseQty = (itemId) => setCartItems(increaseBookingCartQty(itemId));

  const decreaseQty = (itemId) => setCartItems(decreaseBookingCartQty(itemId));

  const removeItem = (itemId) => {
    setCartItems(removeFromBookingCart(itemId));
    showToast?.("Item removed from your booking", "info");
  };

  const clearCart = () => setCartItems(clearBookingCart());

  const billSummary = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gst = +(subtotal * GST_RATE).toFixed(2);
    const serviceCharge = includeServiceCharge ? +(subtotal * SERVICE_CHARGE_RATE).toFixed(2) : 0;
    const grandTotal = +(subtotal + gst + serviceCharge).toFixed(2);
    return { subtotal, gst, serviceCharge, grandTotal, gstRate: GST_RATE, serviceChargeRate: SERVICE_CHARGE_RATE };
  }, [cartItems, includeServiceCharge]);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BookingCartContext.Provider
      value={{
        cartItems,
        addItem,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        includeServiceCharge,
        setIncludeServiceCharge,
        billSummary,
        itemCount,
      }}
    >
      {children}
    </BookingCartContext.Provider>
  );
};

export const useBookingCart = () => useContext(BookingCartContext);
