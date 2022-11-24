class CustomError extends Error {
  sendError(res) {
    return res.status(this.code).send({ message: this.message });
  }
}

module.exports = CustomError;
