const express = require("express");
const router = express.Router();

const userController = require('../controller/userController');


router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/search', userController.searchUsers);


module.exports = router;
