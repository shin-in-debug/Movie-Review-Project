import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import ReviewForm from "./components/ReviewForm";

function App() {
  // Shared state: SearchBar writes it, MovieList reads it (lifting state up)
  const [filterText, setFilterText] = useState("");
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMovies((current) => {
        const firstId =
          current.reduce((highestId, movie) => Math.max(highestId, movie.id), 0) + 1;
        return [
          ...current,
          { id: firstId, title: "Inception", rating: 8.8 },
          { id: firstId + 1, title: "Interstellar", rating: 8.6 },
          { id: firstId + 2, title: "The Dark Knight", rating: 9.0 },
          { id: firstId + 3, title: "Singam", rating: 8.7 },
        ];
      });
      setMoviesLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addMovie = (movie) => {
    console.log("Movie added:", movie);
    setMovies((current) => [
      ...current,
      {
        ...movie,
        id: current.reduce((highestId, item) => Math.max(highestId, item.id), 0) + 1,
      },
    ]);
  };

  const addReview = (review) => {
    console.log("Review added:", review);
  };

  const isSearching = filterText.trim().length > 0;

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">YOUR PERSONAL CINEMA JOURNAL</p>
        <h1>Movie Review Platform</h1>
        <p className="hero-copy">
          Discover movies, save your favorites, and share what you think.
        </p>
      </header>

      <SearchBar onFilterChange={setFilterText} />

      {!isSearching && (
        <section className="form-section add-movie-section">
          <div className="section-heading">
            <span className="section-kicker">MOVIE LIBRARY</span>
            <h2>Add a movie</h2>
            <p>Add a title to your collection and give it a rating.</p>
          </div>
          <MovieForm onAddMovie={addMovie} />
        </section>
      )}

      <section className="content-section movies-section">
        <div className="section-heading">
          <span className="section-kicker">ON THE BIG SCREEN</span>
          <h2>{isSearching ? "Search results" : "Movie collection"}</h2>
          <p>Browse titles and their ratings.</p>
        </div>
        <div className="movie-list">
          <MovieList
            movies={movies}
            loading={moviesLoading}
            filterText={filterText}
          />
        </div>
      </section>

      {!isSearching && (
        <section className="form-section add-review-section">
          <div className="section-heading">
            <span className="section-kicker">SHARE YOUR TAKE</span>
            <h2>Write a review</h2>
            <p>Your review will be shown in the browser console.</p>
          </div>
          <ReviewForm onAddReview={addReview} />
        </section>
      )}
    </div>
  );
}

export default App;
