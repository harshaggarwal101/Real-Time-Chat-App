const express=require('express');
const router=express.Router();
const {signUp, login ,getAllUsers}=require("../controllers/authControllers");
const {checkAuth}=require("../middleware/auth");

router.post("/signup",signUp);
router.post("/login",login);
router.get("/getallusers",checkAuth,getAllUsers);
module.exports=router;