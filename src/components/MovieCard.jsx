import { useState } from "react";

// Each card owns its own favorite state
function MovieCard({ title, genre, rating }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={isFavorite ? "movie-card favorite" : "movie-card"}>
      <h3>{title}</h3>
      {genre && <p className="meta">Genre: {genre}</p>}
      <p className="meta">Rating: {rating}</p>
      <button onClick={() => setIsFavorite(!isFavorite)}>
        {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
      </button>
    </div>
  );
}

export default MovieCard;
