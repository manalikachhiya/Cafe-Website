import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

import App from "./App.jsx";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ToastProvider } from "./context/ToastContext";
import { MenuProvider } from "./context/MenuContext";
import { BookingCartProvider } from "./context/BookingCartContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <ToastProvider>
          <AuthProvider>
            <MenuProvider>
              <BookingCartProvider>
                <App />
              </BookingCartProvider>
            </MenuProvider>
          </AuthProvider>
        </ToastProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>
);
