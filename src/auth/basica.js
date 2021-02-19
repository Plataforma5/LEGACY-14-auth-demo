const basicAuth = require("basic-auth"); // convierte lo que llega en texto plano

function unauthorized(res) {
  // Constestamos que no está autorizado.
  res.set("WWW-Authenticate", "Basic realm=Authorization Required");
  return res.send(401);
}

const auth = (req, res, next) => {
  const auth = basicAuth(req) || {};

  const name = auth["name"];
  const pass = auth["pass"];

  if (!name || !pass) {
    // si no mandaron credenciales no están autorizados
    return unauthorized(res);
  }

  // Si coinciden con lo que esperamos pueden seguir
  if (name === "palito" && pass === "123") {
    // En general controlariamos contra una base de datos si es un usuario válido
    return next();
  }

  return unauthorized(res);
};

module.exports = auth;
