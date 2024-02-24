function checkSecret(data, userPassword) {
  const { _id, secret } = data;
  const currentDate = new Date();

  if (currentDate.getTime() - secret.dateCreated.getTime() > secret.lifetime || !secret.timeToView) {
    return {
      error: 1,
      message: "Secret doesn't exist anymore",
      _id: _id
    }
  }

  if (secret.password !== undefined && userPassword !== secret.password) {
    return {
      error: 2,
      message: "Password is incorrect"
    }
  }

  return {
    error: 0,
    message: 'All checks are passed',
    _id: _id,
    secret: {
      message: secret.message,
      lifetime: secret.lifetime,
      timeToView: secret.timeToView - 1,
      file: secret.file
    }
  }
}

module.exports = checkSecret;
