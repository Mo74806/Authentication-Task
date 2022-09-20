//function to wrap asayn function to handle error that might happens ,instead of using try/catch
module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
