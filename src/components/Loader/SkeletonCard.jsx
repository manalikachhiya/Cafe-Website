const SkeletonCard = () => (
  <div className="col-lg-4 col-md-6 mb-4">
    <div className="skeleton" style={{ height: 200 }} />
    <div className="skeleton mt-2" style={{ height: 20, width: "70%" }} />
    <div className="skeleton mt-2" style={{ height: 16, width: "40%" }} />
  </div>
);

export default SkeletonCard;
