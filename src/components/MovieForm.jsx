import { useState } from "react";

function MovieForm({ onAddMovie }) {
  // One state object for all fields
  const [form, setForm] = useState({ title: "", genre: "", rating: "" });

  // One shared handler: input's `name` decides which field changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Errors are calculated on every render (not stored in state)
  const errors = {};
  if (!form.title.trim()) errors.title = "Title is required";
  if (!form.genre.trim()) errors.genre = "Genre is required";
  if (form.rating === "" || form.rating < 0 || form.rating > 10)
    errors.rating = "Rating must be between 0 and 10";

  const isFormValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page reload
    onAddMovie({ ...form, rating: Number(form.rating) });
    setForm({ title: "", genre: "", rating: "" });
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="genre"
        placeholder="Genre"
        value={form.genre}
        onChange={handleChange}
      />

      <input
        name="rating"
        type="number"
        placeholder="Rating (0-10)"
        value={form.rating}
        onChange={handleChange}
      />
      {form.rating !== "" && errors.rating && (
        <small>{errors.rating}</small>
      )}

      <button type="submit" disabled={!isFormValid}>
        Add Movie
      </button>
    </form>
  );
}

export default MovieForm;
