// Pure display component: props in, UI out. No state.
function ReviewCard({ reviewerName, comment, rating }) {
  return (
    <div className="review-card">
      <h3>{reviewerName}</h3>
      <p>{comment}</p>
      <p className="meta">Rating: {rating}/10</p>
    </div>
  );
}

export default ReviewCard;
