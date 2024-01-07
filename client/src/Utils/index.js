export const catchErrors = fn => 
  function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
};
