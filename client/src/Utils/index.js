import { useNavigate } from 'react-router-dom';
export const catchErrors = fn =>
  function (...args) {
    return fn(...args).catch(err => {
      const nav = useNavigate();
      console.error(err);
      nav('/error');
    });
  };



export const PUT_REQUEST_OPTIONS = (body) => ({
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body
});

export const GET_REQUEST_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
};

export const POST_REQUEST_OPTIONS = (body) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body
});

export const DELETE_REQUEST_OPTIONS = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
};
