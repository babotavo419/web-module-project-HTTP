import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Movie = (props) => {
  const { addToFavorites, deleteMovie } = props;
  const [movie, setMovie] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:9000/api/movies/${id}`)
      .then(res => {
        deleteMovie(id);
        navigate("/movies");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleFavorite = () => {
    addToFavorites(movie);
  };

  return (
    <div className="modal-page col">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{movie.title} Details</h4>
          </div>
          <div className="modal-body">
            <div className="flexContainer">

              {/* Display movie details */}
              <section className="movie-details">
                <p><strong>Title:</strong> {movie.title}</p>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Metascore:</strong> {movie.metascore}</p>
                <p><strong>Description:</strong> {movie.description}</p>
              </section>

              <section>
                <span className="m-2 btn btn-dark" onClick={handleFavorite}>Favorite</span>
                <Link to={`/movies/edit/${movie.id}`} className="m-2 btn btn-success">Edit</Link>
                <span className="delete"><input type="button" className="m-2 btn btn-danger" value="Delete" onClick={handleDelete} /></span>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;

