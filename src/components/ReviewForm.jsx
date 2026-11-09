import { useState } from "react";

function ReviewForm({ onAddReview }) {
  const [form, setForm] = useState({ reviewerName: "", comment: "", rating: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const errors = {};
  if (!form.reviewerName.trim()) errors.reviewerName = "Name is required";
  if (!form.comment.trim()) errors.comment = "Review is required";
  if (form.rating === "" || Number(form.rating) < 0 || Number(form.rating) > 10)
    errors.rating = "Rating must be between 0 and 10";

  const isFormValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview({ ...form, rating: Number(form.rating) });
    setForm({ reviewerName: "", comment: "", rating: "" });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <input
        name="reviewerName"
        placeholder="Your name"
        value={form.reviewerName}
        onChange={handleChange}
      />

      <input
        name="comment"
        placeholder="Your review"
        value={form.comment}
        onChange={handleChange}
      />

      <input
        name="rating"
        type="number"
        min="0"
        max="10"
        placeholder="Rating (0-10)"
        value={form.rating}
        onChange={handleChange}
      />
      {form.rating !== "" && errors.rating && (
        <small>{errors.rating}</small>
      )}

      <button type="submit" disabled={!isFormValid}>
        Add Review
      </button>
    </form>
  );
}

export default ReviewForm;
