// to fetch an async function error and passed in to error middleware
module.exports = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};
