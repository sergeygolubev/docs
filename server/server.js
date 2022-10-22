const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Document = require('./db').Document;
const User = require('./db').User;
const read = require('node-readability');

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

app.get('/docs', (req, res, next) => {
  Document.all((err, documents) => {
    if (err) return next(err);

    res.send(documents);

  });
});

app.get('/documents', (req, res, next) => {
  Document.count((err, documents) => {
    if (err) return next(err);

    res.send(documents);

  });
});

app.get('/users', (req, res, next) => {
  User.all((err, users) => {
    if (err) return next(err);
    res.send(users);
  });
});

app.get('/documents/:id', (req, res, next) => {
  const id = req.params.id;
  Document.find(id, (err, document) => {
    if (err) return next(err);
    res.send(document);
  });
});

app.delete('/documents/:id', (req, res, next) => {
  const id = req.params.id;
  Document.delete(id, (err) => {
    if (err) return next(err);
    res.send({ message: 'Deleted' });
  });
});

app.post('/post-data', (req, res, next) => {
  Document.create(
    { doc_name: req.body.value, user_id: req.body.userID },
    (err, document) => {
      if (err) {
        if (err.message = "Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: documents.doc_name, documents.user_id"){
          res.status(409);
          return next('{"error": "document_is_not_unique"}');
        }
        return next(err);
      }
      console.log(document);
      res.send('{"status": "success"}');
    }
  );

});

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
});

module.exports = app;
