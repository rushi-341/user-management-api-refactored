const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

function initializeDatabase() {
  const db = new sqlite3.Database('users.db');

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `);

    const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

    const users = [
      { name: 'John Doe', email: 'john@example.com', password: 'password123' },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
      { name: 'Bob Johnson', email: 'bob@example.com', password: 'qwerty789' },
    ];

    users.forEach(user => {
      const hashed = bcrypt.hashSync(user.password, 10);
      stmt.run(user.name, user.email, hashed);
    });

    stmt.finalize(() => {
      console.log("Database initialized.");
      db.close();
    });
  });
}

module.exports = initializeDatabase;
