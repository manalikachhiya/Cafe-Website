import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useMenu } from "../../context/MenuContext";
import MenuCard from "../../components/MenuCard/MenuCard";
import FoodDetailsModal from "../../components/MenuSection/FoodDetailsModal";
import "./Menu.css";

const CATEGORIES = [
  "All", "Coffee", "Cold Coffee", "Tea", "Milkshake", "Smoothies", "Pizza", "Burger", "Pasta",
  "Sandwich", "French Fries", "Desserts", "Ice Cream", "Cake", "Pastry", "Breakfast", "Lunch",
  "Dinner", "Drinks", "Special Dish",
];

const SORT_OPTIONS = [
  { value: "default", label: "Sort By" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

const Menu = () => {
  const { menu } = useMenu();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(400);
  const [sort, setSort] = useState("default");
  const [activeItem, setActiveItem] = useState(null);

  const filteredMenu = useMemo(() => {
    let result = menu.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      const matchesPrice = item.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [menu, search, category, maxPrice, sort]);

  return (
    <section className="cv-menu-page">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-eyebrow">Taste The Difference</span>
          <h2 className="section-title">Our Full Menu</h2>
          <p className="section-subtitle mb-0">{menu.length} handcrafted dishes and beverages</p>
        </div>

        <div className="cv-menu-toolbar cv-card p-3 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-lg-4">
              <div className="cv-search-bar">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search menu"
                />
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-3 col-6">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-2">
              <label className="mb-1 small">Max Price: ₹{maxPrice}</label>
              <input
                type="range"
                min="80"
                max="400"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {filteredMenu.length === 0 ? (
          <div className="text-center py-5">
            <h5>No items match your search</h5>
            <p className="text-muted">Try a different category or price range.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredMenu.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <MenuCard item={item} onViewDetails={setActiveItem} />
              </div>
            ))}
          </div>
        )}
      </div>

      {activeItem && <FoodDetailsModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </section>
  );
};

export default Menu;
