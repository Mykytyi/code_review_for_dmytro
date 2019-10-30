const client = require('./db.js');

function auth(request, response, next) {
  if (request.session.login) {
    next();
  } else {
    response.status(401).send('!Not authorized!');
  }
}

function logIn(request, response, next){
  client.query('SELECT * FROM users WHERE login=$1 AND password_hash=MD5($2)',
    [request.body.login, request.body.password],
    (err, result) => {
      if (result.rowCount > 0) {
        request.session.login = request.body.login;
        request.body.id = result.rows[0].id;
        response.status(200).send([request.body.login, request.body.id]);
      } else {
        response.status(401).send('Unauthorized');
      }
    });
}

function signIn(request, response, next) {
  client.query('SELECT * FROM users WHERE login=$1',
    [request.body.login],
    (err,result) => {
    if (result.rowCount > 0) {
      response.status(403).send('This login is already taken');
    } else {
      client.query('INSERT INTO users (login, password_hash) VALUES ($1, MD5($2))',
        [request.body.login, request.body.password],
        (err, result) => {
          if (result.rowCount > 0) {
            response.status(201).send('Created');
          } else {
            response.status(500);
          }
        });
    }
  })
}

module.exports = {auth, logIn, signIn};