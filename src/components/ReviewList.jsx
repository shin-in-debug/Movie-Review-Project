import ReviewCard from "./ReviewCard";

function ReviewList({ reviews, loading }) {
  if (loading && reviews.length === 0) return <p className="status">Loading reviews...</p>;
  if (reviews.length === 0) return <p className="status">No reviews yet.</p>;

  return reviews.map((r) => <ReviewCard key={r.id} {...r} />);
}

export default ReviewList;
