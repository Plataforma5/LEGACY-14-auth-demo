var basicAuth = require('basic-auth'); // convierte lo que llega en texto plano

module.exports =  function auth(req, res, next) {
  var auth  = basicAuth(req) || {};
  var name = auth['name'];
  var pass = auth['pass']
  if (!name || !pass) { // si no mandaron credenciales no están autorizados
    return unauthorized(res);
  };
  // Si coinciden con lo que esperamos pueden seguir

  if (name === 'palito' && pass === '123') { 
  // En gral controlariamos contra una base de datos si es un usuario válido
    return next();
  }
  return unauthorized(res);
};

function unauthorized(res) {   // Constestamos que no está autorizado.
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.send(401);
};