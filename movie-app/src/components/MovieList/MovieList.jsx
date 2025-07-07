import React, { use, useEffect, useState } from "react";
import _ from "lodash";
import Fire from "../../assets/fire.png";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredmovies, setFilteredmovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });
  useEffect(() => {
    fetchMovies();
  }, []);
  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filteredmovies, [sort.by], [sort.order]);
      setFilteredmovies(sortedMovies);
    }
  }, [sort]);
  const fetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=1cb05e393b076cf9afc71e2a6c5bf587"
    );
    const data = await response.json();
    setMovies(data.results);
    setFilteredmovies(data.results);
  };
  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilteredmovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilteredmovies(filtered);
    }
  };
  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(sort);
  return (
    <section className="movie_list">
      <header className="movie_list_header align_center">
        <h2 className="movie_list_heading align_center">
          Popular <img src={Fire} alt="fire emoji" className="navbar-emoji" />
        </h2>
        <div className="movie_list_fs align_center">
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />
          <select
            name="by"
            id=""
            className="movie_sorting"
            onChange={handleSort}
            value={sort.by}
          >
            <option value="default">Sort By</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            id=""
            className="movie_sorting"
            onChange={handleSort}
            value={sort.order}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {filteredmovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
