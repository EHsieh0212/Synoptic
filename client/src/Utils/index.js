export const catchErrors = fn =>
  function (...args) {
    return fn(...args).catch(err => {
      console.error(err);
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