import React, { useEffect, useState } from "react";
import AddMovieForm from './components/AddMovieForm';
import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
  }

  const addToFavorites = (movie) => {
    setFavoriteMovies([...favoriteMovies, movie]);
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />
          <Routes>
            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies} />} />
            <Route path="/movies/:id" element={<Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites} />} />
            <Route path="movies" element={<MovieList movies={movies} deleteMovie={deleteMovie} />} />
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/movies/add" element={<AddMovieForm setMovies={setMovies} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;

