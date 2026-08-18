// Central localStorage helpers used across CafeVerse.
// Namespaced under "cafeverse_" to avoid clashing with other apps.

const RESERVATIONS_KEY = "cafeverse_reservations";
const WISHLIST_KEY = "cafeverse_wishlist";
const THEME_KEY = "cafeverse_theme";
const USER_KEY = "cafeverse_user";
const USERS_KEY = "cafeverse_users";
const NEWSLETTER_KEY = "cafeverse_newsletter";

/* ---------------- Generic helpers ---------------- */
const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Failed to read ${key} from localStorage`, err);
    return fallback;
  }
};

const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to write ${key} to localStorage`, err);
  }
};

/* ---------------- Reservations ---------------- */
export const generateReservationId = () => {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `CV-${Date.now().toString().slice(-6)}-${random}`;
};

export const getReservations = () => readJSON(RESERVATIONS_KEY, []);

export const saveReservation = (reservation) => {
  const reservations = getReservations();
  const newReservation = {
    ...reservation,
    reservationId: generateReservationId(),
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  };
  reservations.unshift(newReservation);
  writeJSON(RESERVATIONS_KEY, reservations);
  return newReservation;
};

export const deleteReservation = (reservationId) => {
  const reservations = getReservations().filter((r) => r.reservationId !== reservationId);
  writeJSON(RESERVATIONS_KEY, reservations);
  return reservations;
};

/* ---------------- Wishlist ---------------- */
export const getWishlist = () => readJSON(WISHLIST_KEY, []);

export const toggleWishlist = (itemId) => {
  const wishlist = getWishlist();
  const exists = wishlist.includes(itemId);
  const updated = exists ? wishlist.filter((id) => id !== itemId) : [...wishlist, itemId];
  writeJSON(WISHLIST_KEY, updated);
  return updated;
};

/* ---------------- Theme (Dark Mode) ---------------- */
export const getTheme = () => localStorage.getItem(THEME_KEY) || "light";
export const setTheme = (theme) => localStorage.setItem(THEME_KEY, theme);

/* ---------------- Auth (UI only, no real backend) ---------------- */
export const getUsers = () => readJSON(USERS_KEY, []);

export const registerUser = (user) => {
  const users = getUsers();
  if (users.some((u) => u.email === user.email)) {
    return { success: false, message: "An account with this email already exists." };
  }
  users.push(user);
  writeJSON(USERS_KEY, users);
  return { success: true };
};

export const loginUser = (email, password, remember = false) => {
  const users = getUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) return { success: false, message: "Invalid email or password." };
  setCurrentUser({ name: found.name, email: found.email }, remember);
  return { success: true, user: found };
};

// Persists the logged-in user. If "remember" is true, the login survives closing the
// browser (localStorage). Otherwise it only lasts for the current browser tab/session
// (sessionStorage) and disappears once the tab or browser is closed.
export const setCurrentUser = (user, remember) => {
  // Clear any existing session in both storages first, so switching accounts
  // or remember-preference never leaves a stale copy behind in the other storage.
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);

  if (remember) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const logoutUser = () => {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
};

// Checks the session-only login first, then falls back to a remembered login.
export const getCurrentUser = () => {
  try {
    const sessionRaw = sessionStorage.getItem(USER_KEY);
    if (sessionRaw) return JSON.parse(sessionRaw);
  } catch (err) {
    console.error("Failed to read session user", err);
  }
  return readJSON(USER_KEY, null);
};

/* ---------------- Newsletter ---------------- */
export const subscribeNewsletter = (email) => {
  const list = readJSON(NEWSLETTER_KEY, []);
  if (!list.includes(email)) {
    list.push(email);
    writeJSON(NEWSLETTER_KEY, list);
  }
};

/* ==========================================================================
   BOOKING CART — items selected from the Menu page for table reservation
   (NOT an online ordering system; used only to prepare a "Book Table" order)
   ========================================================================== */

const BOOKING_CART_KEY = "cafeverse_booking_cart";
const BOOKING_HISTORY_KEY = "cafeverse_booking_history";

export const getBookingCart = () => readJSON(BOOKING_CART_KEY, []);

// Adds a menu item to the booking cart, or increases its quantity if already present.
export const addToBookingCart = (menuItem) => {
  const cart = getBookingCart();
  const existing = cart.find((c) => c.id === menuItem.id);

  let updated;
  if (existing) {
    updated = cart.map((c) => (c.id === menuItem.id ? { ...c, quantity: c.quantity + 1 } : c));
  } else {
    updated = [
      ...cart,
      {
        id: menuItem.id,
        name: menuItem.name,
        image: menuItem.image,
        price: menuItem.price,
        category: menuItem.category,
        quantity: 1,
      },
    ];
  }

  writeJSON(BOOKING_CART_KEY, updated);
  return updated;
};

// Increases quantity of a single cart item by 1.
export const increaseBookingCartQty = (itemId) => {
  const cart = getBookingCart();
  const updated = cart.map((c) => (c.id === itemId ? { ...c, quantity: c.quantity + 1 } : c));
  writeJSON(BOOKING_CART_KEY, updated);
  return updated;
};

// Decreases quantity of a single cart item by 1. Removes the item automatically if it hits 0.
export const decreaseBookingCartQty = (itemId) => {
  const cart = getBookingCart();
  const updated = cart
    .map((c) => (c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c))
    .filter((c) => c.quantity > 0);
  writeJSON(BOOKING_CART_KEY, updated);
  return updated;
};

export const removeFromBookingCart = (itemId) => {
  const updated = getBookingCart().filter((c) => c.id !== itemId);
  writeJSON(BOOKING_CART_KEY, updated);
  return updated;
};

export const clearBookingCart = () => {
  writeJSON(BOOKING_CART_KEY, []);
  return [];
};

/* ---------------- Booking History (Reservation + Selected Items + Bill) ---------------- */

export const generateBookingId = () => {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `CVB-${Date.now().toString().slice(-6)}-${random}`;
};

export const generateInvoiceNumber = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `INV-${new Date().getFullYear()}-${random}`;
};

export const getBookingHistory = () => readJSON(BOOKING_HISTORY_KEY, []);

export const getBookingById = (bookingId) =>
  getBookingHistory().find((b) => b.bookingId === bookingId) || null;

// Saves a full booking: customer info + reservation details + selected food items + bill.
export const saveBookingHistory = (booking) => {
  const history = getBookingHistory();
  const newBooking = {
    ...booking,
    bookingId: generateBookingId(),
    invoiceNumber: generateInvoiceNumber(),
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  };
  history.unshift(newBooking);
  writeJSON(BOOKING_HISTORY_KEY, history);
  return newBooking;
};

export const deleteBookingHistory = (bookingId) => {
  const updated = getBookingHistory().filter((b) => b.bookingId !== bookingId);
  writeJSON(BOOKING_HISTORY_KEY, updated);
  return updated;
};
