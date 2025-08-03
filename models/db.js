const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    console.error('Error opening DB:', err.message);
  } else {
    console.log('Connected to DB');
  }
});

module.exports = db;
