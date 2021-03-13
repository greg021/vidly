import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";

function Movies() {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (movie) => {
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
  };

  if (movies.length === 0) {
    return <p>There are no movies in the Database.</p>;
  }

  return (
    <>
      <p>Showing {movies.length} movies in the Database</p>
      <table className="table">
        <thead>
          <tr>
            <td>Title</td>
            <td>Genre</td>
            <td>Stock</td>
            <td>Rate</td>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <button
                  onClick={() => handleDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Movies;
