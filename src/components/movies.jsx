import React, { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import _ from "lodash";

function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const pageSize = 5;

  useEffect(() => {
    setGenres([{ name: "All Genres", _id: "" }, ...getGenres()]);
    setAllMovies(getMovies());
  }, []);

  const handleDelete = (movie) => {
    const movies = allMovies.filter((m) => m._id !== movie._id);
    setAllMovies(movies);
  };

  const handleLike = (movie) => {
    const movies = [...allMovies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    setAllMovies(movies);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sc) => {
    setSortColumn(sc);
  };

  const getPagedData = () => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  const { totalCount, data: movies } = getPagedData();

  if (allMovies.length === 0) {
    return <p>There are no movies in the Database.</p>;
  }
  return (
    <div className="row mt-4">
      <div className="col-2">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={(genre) => handleGenreSelect(genre)}
        />
      </div>
      <div className="col">
        <p>Showing {totalCount} movies in the Database</p>
        <MoviesTable
          movies={movies}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onLike={handleLike}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onChangePage={(page) => handleChangePage(page)}
        />
      </div>
    </div>
  );
}

export default Movies;
