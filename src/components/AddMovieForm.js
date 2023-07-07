import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMovieForm = ({setMovies}) => {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/movies', movie)
      .then(res => {
        setMovies(prevMovies => [...prevMovies, res.data]);
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="col">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={movie.title} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Director:</label>
            <input type="text" name="director" value={movie.director} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Genre:</label>
            <input type="text" name="genre" value={movie.genre} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Metascore:</label>
            <input type="number" name="metascore" value={movie.metascore} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={movie.description} onChange={handleChange} className="form-control"></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Add Movie</button>
        </form>
      </div>
    </div>
  );
}

export default AddMovieForm;
