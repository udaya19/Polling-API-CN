exports.successMessage = (message, results, success) => {
  return {
    message,
    results,
    success,
  };
};
exports.internalError = (error, success) => {
  return {
    error,
    success,
  };
};
