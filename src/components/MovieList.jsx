import MovieCard from "./MovieCard";

function MovieList({ movies, loading, filterText }) {
  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(filterText.toLowerCase())
  );

  if (loading && movies.length === 0) return <p className="status">Loading movies...</p>;
  if (filtered.length === 0) return <p className="status">The Movies is not Found</p>;

  return filtered.map((m) => <MovieCard key={m.id} {...m} />);
}

export default MovieList;
