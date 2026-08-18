# ☕ CafeVerse — Modern Cafe & Restaurant Website

CafeVerse is a fully responsive, premium-quality cafe & restaurant website built with React.js. Guests can browse a 46-item menu, explore a photo gallery, reserve a table with full validation, read testimonials, and enjoy a beautiful dark mode — all running entirely on the frontend with no backend required.

---

## ✨ Features

- **Home Page** — hero banner, cafe introduction, special offers, popular menu, services, statistics, gallery preview, testimonials, Instagram feed UI, newsletter signup
- **Menu Page** — 46 menu items across 19 categories (Coffee, Pizza, Burgers, Desserts, Breakfast, and more), with search, category filter, price filter, sorting (price/rating/newest), wishlist, and a food details modal
- **Gallery Page** — masonry-style photo gallery with category filters and a full lightbox preview (prev/next navigation)
- **Reservation System** — full form with validation (required fields, email/phone format, valid date, guest count), auto-generated reservation ID, success modal, and reservation history (view/cancel) — all saved to LocalStorage
- **About Page** — cafe story, mission, vision, values, chef & team introduction, awards
- **Contact Page** — contact info, working hours, contact form with validation, map placeholder
- **Authentication UI** — Login & Signup pages with client-side validation (LocalStorage-based, UI-only Google button)
- **Dark Mode** — full theme toggle with preference saved in LocalStorage
- **Extras** — floating WhatsApp & Call buttons, back-to-top button, toast notifications, skeleton loading, 404 page, newsletter subscription
- **Fully Responsive** — optimized for mobile, tablet, laptop, and desktop
- **Animations** — fade, slide, scale, hover, image zoom, smooth scroll

---

## 🛠️ Technologies Used

- React.js (Vite)
- React Router DOM
- Bootstrap 5 (grid/layout) + custom CSS design system
- React Icons
- Google Fonts (Playfair Display + Poppins)
- Browser LocalStorage (reservations, wishlist, theme, auth, newsletter)
- JSON static data (`menu.json`, `gallery.json`, `reviews.json`)

> **Note:** Per the project brief, this is a frontend-only project with no backend or database — all data is either static JSON or persisted in the browser's LocalStorage.

---

## 📁 Folder Structure

```
cafeverse/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/              # homepage intro section
│   │   ├── MenuCard/
│   │   ├── MenuSection/        # popular menu + FoodDetailsModal
│   │   ├── Gallery/             # masonry + lightbox
│   │   ├── ReservationForm/
│   │   ├── ContactForm/
│   │   ├── Footer/
│   │   ├── Testimonials/
│   │   ├── Services/
│   │   ├── OfferBanner/
│   │   ├── Newsletter/
│   │   ├── Loader/
│   │   ├── DarkModeToggle/
│   │   └── ScrollTop/          # back-to-top + WhatsApp/Call buttons
│   ├── pages/
│   │   ├── Home/
│   │   ├── Menu/
│   │   ├── Gallery/
│   │   ├── Reservation/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Login/
│   │   ├── Signup/
│   │   └── NotFound/
│   ├── data/
│   │   ├── menu.json           # 46 menu items
│   │   ├── gallery.json        # 16 gallery images
│   │   └── reviews.json        # 10 customer reviews
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useScrollTop.js
│   ├── context/
│   │   ├── DarkModeContext.jsx
│   │   ├── ToastContext.jsx
│   │   └── MenuContext.jsx
│   ├── utils/
│   │   ├── localStorage.js     # reservations, wishlist, theme, auth
│   │   └── validators.js       # form validation helpers
│   ├── styles/
│   │   └── global.css          # design tokens, theme, animations
│   ├── App.jsx                  # routes
│   └── main.jsx                  # providers + entry point
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup

1. **Extract the zip** and open the `cafeverse` folder in VS Code.
2. Open a terminal in that folder and install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL shown in the terminal (usually `http://localhost:5173`).

5. To build for production:

   ```bash
   npm run build
   npm run preview
   ```

---

## 🎨 Color Theme

| Purpose    | Color     |
|------------|-----------|
| Primary    | `#6F4E37` |
| Secondary  | `#D4A373` |
| Accent     | `#E9C46A` |
| Background | `#FFF8F0` |
| Text       | `#222222` |
| Cards      | `#FFFFFF` |
| Radius     | `18px`    |

Dark mode uses an equivalent dark palette, toggled via the navbar and persisted in LocalStorage.

---

## 📸 Screenshots

_Add screenshots here after running the app locally, e.g.:_

- `screenshots/home.png`
- `screenshots/menu.png`
- `screenshots/gallery.png`
- `screenshots/reservation.png`

---

## 🔮 Future Improvements

- Connect to a real backend (Node/Express) with a database for persistent, multi-device reservations and real authentication
- Online ordering with payment gateway integration
- Admin dashboard for menu and reservation management
- Real Google Maps embed on the Contact page
- Email/SMS reservation confirmations
- Loyalty points and rewards system

---

## 👤 Author

Built as a college project / portfolio piece — CafeVerse demonstrates a complete, production-quality React frontend application.

---

## 📄 License

This project was built for educational/portfolio purposes. Images are sourced from Unsplash (free to use) and avatars from pravatar.cc.
