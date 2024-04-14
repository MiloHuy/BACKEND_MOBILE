const createBadRequest = (msg: string) => {
  const error = new Error(msg);
  error.message = msg;
  return error;
}

const createUnauthorized = (msg: string) => {
  const error = new Error(msg);
  error.message = 'Unauthorized';
  return error;
}

const createForbidden = (msg: string) => {
  const error = new Error(msg);
  error.message = 'Forbidden';
  return error;
}

const createNotFound = (msg: string) => {
  const error = new Error(msg);
  error.message = 'Not found';
  return error;
}

export {
  createBadRequest, createForbidden, createNotFound, createUnauthorized
};

