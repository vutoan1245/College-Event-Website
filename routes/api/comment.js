const express = require('express');
const passport = require('passport');
const router = express.Router();
const Comments = require('../../models/Comment');

// @route   POST api/../:eid/comment/post
// @desc    Post comment to an event
// @access  Student
router.post(
  '/:eid/post',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { pid } = req.user;
    const { eid } = req.params;
    const { text, rating } = req.body;
    Comments.add({ pid, eid, text, rating })
      .then(() => res.status(200).json({ message: 'Success' }))
      .catch(() =>
        res.status(400).json({ message: 'Something wrong when add comment' })
      );
  }
);
// @route   GET api/../:eid/comment/post
// @desc    Get comment list of an event
// @access  Public
router.get('/:eid/list', (req, res) => {
  const { eid } = req.params;
  Comments.findByEid(eid)
    .then(data => res.status(200).json({ data }))
    .catch(() => res.status(400).json({ message: 'Something wrong' }));
});

// @route   PUT api/../:eid/comment/post
// @desc    Edit comment of a event
// @access  Public
router.put(
  '/:cid/edit',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { cid } = req.params;
    const { pid } = req.user;
    const { text, rating } = req.body;
    Comments.updateComment({ cid, pid, text, rating })
      .then(() => res.status(200).json({ message: 'Success' }))
      .catch(() => res.status(400).json({ message: 'Something wrong' }));
  }
);

// @route   DELETE api/../:eid/comment/post
// @desc    DELETE a comment of a event
// @access  Student
router.delete(
  '/:cid/delete',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { cid } = req.params;
    const { pid } = req.user;
    Comments.delete({ cid, pid })
      .then(() => res.status(200).json({ message: 'Success' }))
      .catch(() => res.status(400).json({ message: 'Something wrong' }));
  }
);

module.exports = router;
