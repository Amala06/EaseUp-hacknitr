// const express=require('express');
// const {registerUser,authUser,allUsers}=require("../controllers/userController")
// const {protect}=require('../middleware/authMiddleware');
// const router=express.Router();

// router.route('/').post(registerUser).get(protect,allUsers);
// router.post('/login',authUser);

// module.exports=router;

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  authUser,
  registerListener,
  authListener,
  allUsers,
} = require("../Controllers/UserController");
const router = express.Router();
router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/listener", registerListener);
router.post("/listener/login", authListener);
router.route("/").get(protect, allUsers);

module.exports = router;
