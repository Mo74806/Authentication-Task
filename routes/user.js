const express = require("express");
const router = express.Router();
const checkAuth = require("../middleWare/checkAuth");
const catchAsync = require("../utils/catchAsync");
const user = require("../controllers/user");

router.post("/register", catchAsync(user.register));
router.post("/login", catchAsync(user.login));
router.get("/home", checkAuth.checkAuth, user.home);
router.get("/logout", user.logout);

module.exports = router;
