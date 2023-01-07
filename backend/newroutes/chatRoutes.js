const express=require('express');
const router=express.Router();
const {protect}=require('../middleware/authMiddleware');
const{accessChat,fetchChats,creatGroupChat,renameGroup,addToGroup,removeFromGroup}=require("../controllers/chatControllers")

router.route('/').post(protect,accessChat);
router.route("/").get(protect,fetchChats);
router.route("/group").post(protect,creatGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);

module.exports=router;