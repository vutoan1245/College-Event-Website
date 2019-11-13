const express = require('express');
const passport = require('passport');
const router = express.Router();
const Comments = require('../../models/Comment');
router.post(
  '/post',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { pid } = req.user;
    const { eid } = req.body;
    Comments.add({ pid, eid });
  }
);
module.exports = router;
