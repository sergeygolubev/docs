const sqlite3 = require('sqlite3').verbose();
const dbName = 'docs.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
const sql_create_documents_table = `
  CREATE TABLE IF NOT EXISTS documents
    (doc_name TEXT, user_id INTEGER, UNIQUE(doc_name, user_id));
  `;
  db.run(sql_create_documents_table);

const sql_create_users_table = `
  CREATE TABLE IF NOT EXISTS users
    (id integer primary key, user_name TEXT)
  `;
  db.run(sql_create_users_table);

const sql_create_users = `INSERT INTO users (id, user_name) VALUES
  (1, 'Ivanov I.I.'),
  (2, 'Petrov P.P.'),
  (3, 'Sidorov V.V.');`;
  db.run(sql_create_users, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of users");
  });

  const sql_create_documents = `INSERT INTO documents (doc_name, user_id) VALUES
    ('Документ 1', 1),
    ('Документ 2', 2),
    ('ГОСТ 4000', 3),
    ('Документ 4', 1),
    ('ГОСТ 4000', 2),
    ('Документ 8', 1),
    ('ГОСТ 4000', 1),
    ('Документ 8', 2),
    ('Документ 8', 3);`;
    db.run(sql_create_documents, err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of documents");
    });

});

class User {
  static all(cb) {
    db.all('SELECT * FROM users', cb);
  }
}

class Document {
  static all(cb) {
    db.all('SELECT * FROM documents', cb);
  }

  static find(id, cb) {
    db.get('SELECT * FROM documents WHERE id = ?', id, cb);
  }

  static count(cb) {
    db.all('SELECT doc_name, count(*) as count FROM documents GROUP BY doc_name ORDER BY count DESC', cb);
  }

  static create(data, cb) {
    const sql = 'INSERT INTO documents(doc_name, user_id) VALUES (?, ?)';
    db.run(sql, data.doc_name, data.user_id, cb);
  }

  static delete(id, cb) {
    if (!id) return cb(new Error('Please provide an id'));
    db.run('DELETE FROM documents WHERE id = ?', id, cb);
  }
}

module.exports = db;
module.exports.Document = Document;
module.exports.User = User;
