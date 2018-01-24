const express = require('express');
const router = express.Router();
const Gifts = require('../controllers/Gifts');

router
  .route('/')
  .get(Gifts.read)
  .post(Gifts.create)
  .delete(Gifts.delete)

module.exports = router;
