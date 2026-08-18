import "./Loader.css";

const Loader = () => (
  <div className="cv-loader-wrap">
    <div className="cv-loader-spinner" role="status" aria-label="Loading" />
    <p className="mt-3 text-primary-custom fw-semibold">Brewing CafeVerse...</p>
  </div>
);

export default Loader;
