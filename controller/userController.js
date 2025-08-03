const db = require('../models/db');
const bcrypt = require('bcryptjs');
// to get all the users
const getAllUsers = (req,res)=>{
    db.all('SELECT id,name,email FROM users',[],(err,rows)=>{
        if(err){
            return res.status(500).json({
                status:"error",
                message : err.message
            })
        }
        res.status(200).json({
            status:"Successful",
            message : rows
        })
    })
}
//to get a specific user
const getUserById = (req,res)=>{
    const {id} = req.params
    db.get('SELECT id,name,email FROM users WHERE id = ?',[id],(err,row)=>{
        if(err){
            return res.status(500).json({
                status:"error",
                message : err.message
            })
        }
        if(!row){
            return  res.status(404).json({
                 message: 'User not found' 
            });
        }
        res.status(200).json({
            status : "Successful",
            message : row
        })
    })
}
//create user in db
const createUser = (req,res)=>{
    const {name,email,password} = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
      }
    
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users(name,email,password) VALUES (?,?,?)',[name,email,hashedPassword],(err)=>{
    if(err){
        if(err.message,includes('UNIQUE constrain failed')){
            return res.status(409).json({
                status : "Unsuccessful",
                message : err.message
            })
        }
        return res.status(500).json({
            status : "Unsuccessful",
            message : err.message
        })
    }
    res.status.json(201).json({
        message : "User Created",
        userId :this.lastID
    })
  })
}
//update user in db
const updateUser = (req,res)=>{
    const {name,email,password} = req.body 
    if(!name && !email && !password){
        return res.status(400).json({
            message : "Nothing to update"
        })
    }
    const updates = [];
    const params = [];
  
    if (name) {
      updates.push('name = ?');
      params.push(name);
    }
  
    if (email) {
      updates.push('email = ?');
      params.push(email);
    }
  
    if (password) {
      const hashed = bcrypt.hashSync(password, 10);
      updates.push('password = ?');
      params.push(hashed);
    }
  
    params.push(id);
  
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    db.run(query, params, function (err) {
      if (err) return res.status(500).json({ 
        error: err.message 
          });
      if (this.changes === 0) return res.status(404).json({ 
        message: 'User not found' 
          });
      res.status(200).json({ 
        message: 'User updated' 
        });
    });
}
//delete user 
const deleteUser = (req,res)=>{
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted' });
    });
}
//search users by name 
const searchUsers = (req,res)=>{
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Name query parameter is required' });
  
    db.all('SELECT id, name, email FROM users WHERE name LIKE ?', [`%${name}%`], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ results: rows });
    });
}
//login
const loginUser = (req,res)=>{
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });
  
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });
  
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
  
      res.status(200).json({ message: 'Login successful', userId: user.id });
    });
}
module.exports ={getAllUsers,getUserById,createUser,updateUser,deleteUser,searchUsers,loginUser}