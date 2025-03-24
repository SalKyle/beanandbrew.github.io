const db = require('../config/db'); 

db.run('DROP TABLE IF EXISTS users', (err) => {
  if (err) {
    console.error('Error dropping table:', err);
  } else {
    console.log('Table dropped');
  }
});


db.run(`
  CREATE TABLE IF NOT EXISTS users (
    User_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    User_Name TEXT,
    Phone_No TEXT,
    Address TEXT,
    Email TEXT UNIQUE,
    Password TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table created or already exists');
  }
});
