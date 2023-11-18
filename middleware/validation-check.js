const jsonFormatValidator = (req, res, next) => {
  try {
    if (typeof req.body.ticket_no !== 'string') {
      throw new Error('ticket_no is not a string');
    }
    console.log('runs!')
    return next();
  } catch (error) {
    error.status = 400;
    return next(error);
  }
}

export {
  jsonFormatValidator,
}