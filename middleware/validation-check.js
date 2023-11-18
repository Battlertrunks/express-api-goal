const jsonFormatValidator = (req, res, next) => {
  try {
    if (typeof req.body.ticket_no !== 'string') {
      throw new Error('ticket_no is not a string');
    }
    return;
  } catch (error) {
    res.status(400).send(error.message);
    return next(error);
  }
}

export {
  jsonFormatValidator,
}