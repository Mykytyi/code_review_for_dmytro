const client = require('./db.js');

function posts(request, response, next) {
  client.query(
    `SELECT user_id, task_id, title, main_text, is_done, is_favorite FROM posts INNER JOIN users ON users.id = posts.user_id AND login = $1 ORDER BY is_favorite DESC`,
    [request.session.login],
    (err, result) => {
      if (result.rowCount > 0) {
        response.json(result.rows);
      } else {
        response.json([]);
      }
    });
}

function changingTasksOfUser(request, response) {
  if(request.body.taskList) {
    console.log(`WE've got message`);
    let arrayOfTasks = JSON.parse(request.body.taskList);
    let user_id = + request.body.userId;
    client.query(`DELETE FROM posts WHERE user_id = $1`, [user_id]);
    arrayOfTasks.forEach((elem) => {
      client.query(`INSERT INTO posts (user_id, title, main_text, is_done, is_favorite) VALUES ($1, $2, $3, $4, $5)`,
        [elem.user_id, elem.title, elem.main_text, elem.is_done, elem.is_favorite]);
    });
    response.status(200).send('Tasks were updated');
  } else {
    response.status(400).send(`The body doesn't include task list`);
  }
  delete request.session.login;
}

module.exports = { posts, changingTasksOfUser };