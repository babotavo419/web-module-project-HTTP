import React from 'react';
import axios from 'axios';

const DeleteMovieModal = ({ movieId, deleteMovie, onClose }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:9000/api/movies/${movieId}`)
      .then(res => {
        deleteMovie(movieId);
        onClose();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div id="deleteEmployeeModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
            <div className="modal-header">
              <h4 className="modal-title">Delete Employee</h4>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete these Records?</p>
              <p className="text-warning"><small>This action cannot be undone.</small></p>
            </div>
            <div className="modal-footer">
              <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={onClose} />
              <input type="submit" className="btn btn-danger" value="Delete" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovieModal;

