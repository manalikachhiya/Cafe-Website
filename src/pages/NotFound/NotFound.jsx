import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="cv-404 d-flex align-items-center text-center">
      <div className="container">
        <h1 className="cv-404-code">404</h1>
        <h3>Oops! This Table Doesn't Exist</h3>
        <p className="text-muted mb-4">
          The page you're looking for has been moved or doesn't exist.
        </p>
        <Link to="/">
          <button className="btn-primary-custom d-inline-flex align-items-center gap-2">
            <FiHome /> Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
