const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const { auth, logIn, signIn } = require('./auth.js');
const { posts, changingTasksOfUser } = require('./client.js');


app.use(express.static(path.join(__dirname,'client/build')));
app.use(cookieParser());
app.use(express.json());
app.use(session({
  secret: 'just test',
  name: "mycookie",
  resave: true,
  saveUninitialized: true,
  ssl: true
}));

app.post('/api/login', logIn);
app.post('/api/signIn', signIn);

app.use(auth);

app.get('/api/login/userTaskList', posts);

app.post('/api/login/sendTaskList', changingTasksOfUser);
app.use((request, response) => {
  response.status(404).send('Not found!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});