//refractoring the api responses so that code looks clean
exports.successMessage = (message, results, success) => {
  //will be called if api response is succesfull
  return {
    message,
    results,
    success,
  };
};

exports.notFound = (error, success) => {
  //will be called for not found errors
  return {
    error,
    success,
  };
};

exports.internalError = (error, success) => {
  //will be called if there is any internal error
  return {
    error,
    success,
  };
};
