// Reusable validation helpers for forms across the app.

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPhone = (phone) => /^[0-9+\-\s()]{7,15}$/.test(phone);
export const isNotEmpty = (value) => value !== undefined && value !== null && value.toString().trim() !== "";

export const isFutureOrTodayDate = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr);
  return date >= today;
};

export const validateReservationForm = (form) => {
  const errors = {};

  if (!isNotEmpty(form.fullName)) errors.fullName = "Full name is required.";

  if (!isNotEmpty(form.email)) errors.email = "Email is required.";
  else if (!isValidEmail(form.email)) errors.email = "Please enter a valid email address.";

  if (!isNotEmpty(form.phone)) errors.phone = "Phone number is required.";
  else if (!isValidPhone(form.phone)) errors.phone = "Please enter a valid phone number.";

  if (!isNotEmpty(form.date)) errors.date = "Reservation date is required.";
  else if (!isFutureOrTodayDate(form.date)) errors.date = "Date cannot be in the past.";

  if (!isNotEmpty(form.time)) errors.time = "Reservation time is required.";

  if (!isNotEmpty(form.guests)) errors.guests = "Number of guests is required.";
  else if (Number(form.guests) < 1 || Number(form.guests) > 20) {
    errors.guests = "Guests must be between 1 and 20.";
  }

  if (!isNotEmpty(form.tablePreference)) errors.tablePreference = "Please choose a table preference.";
  if (!isNotEmpty(form.occasion)) errors.occasion = "Please select an occasion.";

  return errors;
};

export const validateSignupForm = (form) => {
  const errors = {};
  if (!isNotEmpty(form.name)) errors.name = "Name is required.";
  if (!isNotEmpty(form.email)) errors.email = "Email is required.";
  else if (!isValidEmail(form.email)) errors.email = "Please enter a valid email address.";
  if (!isNotEmpty(form.phone)) errors.phone = "Phone number is required.";
  else if (!isValidPhone(form.phone)) errors.phone = "Please enter a valid phone number.";
  if (!isNotEmpty(form.password)) errors.password = "Password is required.";
  else if (form.password.length < 6) errors.password = "Password must be at least 6 characters.";
  if (form.confirmPassword !== form.password) errors.confirmPassword = "Passwords do not match.";
  return errors;
};

export const validateLoginForm = (form) => {
  const errors = {};
  if (!isNotEmpty(form.email)) errors.email = "Email is required.";
  else if (!isValidEmail(form.email)) errors.email = "Please enter a valid email address.";
  if (!isNotEmpty(form.password)) errors.password = "Password is required.";
  return errors;
};

// Validator for the "Book Table" checkout form used on the My Booking page.
// Similar to validateReservationForm but without table preference / occasion,
// since those are already covered by the existing Reservation page.
export const validateTableBookingForm = (form) => {
  const errors = {};

  if (!isNotEmpty(form.fullName)) errors.fullName = "Full name is required.";

  if (!isNotEmpty(form.email)) errors.email = "Email is required.";
  else if (!isValidEmail(form.email)) errors.email = "Please enter a valid email address.";

  if (!isNotEmpty(form.phone)) errors.phone = "Phone number is required.";
  else if (!isValidPhone(form.phone)) errors.phone = "Please enter a valid phone number.";

  if (!isNotEmpty(form.date)) errors.date = "Reservation date is required.";
  else if (!isFutureOrTodayDate(form.date)) errors.date = "Date cannot be in the past.";

  if (!isNotEmpty(form.time)) errors.time = "Reservation time is required.";

  if (!isNotEmpty(form.guests)) errors.guests = "Number of guests is required.";
  else if (Number(form.guests) < 1 || Number(form.guests) > 20) {
    errors.guests = "Guests must be between 1 and 20.";
  }

  return errors;
};

export const validateContactForm = (form) => {
  const errors = {};
  if (!isNotEmpty(form.name)) errors.name = "Name is required.";
  if (!isNotEmpty(form.email)) errors.email = "Email is required.";
  else if (!isValidEmail(form.email)) errors.email = "Please enter a valid email address.";
  if (!isNotEmpty(form.message)) errors.message = "Message is required.";
  return errors;
};
