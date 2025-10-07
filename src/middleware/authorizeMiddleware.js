const authorizationAdmin = (req, res, next) => {

  const user = req.user;
  if (!user || user.role !== "admin") {
    return res.status(404).send('Acceso Denegados');
  }
  next();
}



module.exports = authorizationAdmin