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

export const CHATBOT_API_URL = `${process.env.REACT_APP_WEBSITE_URL}/api/v1/chatbot`;