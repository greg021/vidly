// import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "6035e0662b89a5bb4d05f709",
    title: "The Nun",
    genre: { _id: "6035de13f23b51b693b419e1", name: "Horror" },
    numberInStock: 35,
    dailyRentalRate: 20,
    __v: 0,
  },
  {
    _id: "6035e16a2b89a5bb4d05f70b",
    title: "Black Panther",
    genre: { _id: "6035de0bf23b51b693b419e0", name: "Sci Fi" },
    numberInStock: 2,
    dailyRentalRate: 50,
    __v: 0,
  },
];

export function getMovies() {
  return movies;
}
