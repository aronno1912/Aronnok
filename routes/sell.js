const express = require('express');
const router = express.Router();
const { check, validationResult, oneOf } = require("express-validator");
const{
    sellRequest,
    requestApproval,
    getAllSellRequest,
}= require('../controller/sell');
const { getUserById } = require("../controller/user");
router.param("userId", getUserById);
router.post('/sellRequest/:userId',sellRequest);
router.post('/requestApproval/:reqId',requestApproval);
router.get('/sellRequest/getAll',getAllSellRequest);
module.exports = router;