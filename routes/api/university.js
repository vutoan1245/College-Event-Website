const express = require('express');
const University = require('../../models/University');
const passport = require('passport');
const router = express.Router();

// @route   POST api/../university/create
// @desc    Create new university profile
// @access  Super Admin
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { spid, access } = req.user;
    const { name, description, student_count, picture, location } = req.body;

    if (!spid || access !== 'super admin') {
      return res
        .status(400)
        .json({ message: 'Required permission: Super Admin' });
    }
    University.findByName(name)
      .then(uni => {
        if (uni.length > 0) {
          return res.status(404).json({ message: 'University profile exists' });
        } else {
          const newUni = {
            spid,
            name,
            description,
            student_count,
            picture,
            location
          };
          University.add(newUni)
            .then(uid => res.status(200).json({ uid }))
            .catch(() => res.status(400).json({ message: 'Something wrong' }));
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
      });
  }
);
// @route   GET api/university/names
// @desc    Return a list of all univiersities
// @access  Public
router.get('/names', (req, res) => {
  University.findNameList()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ message: 'Something went wrong' });
    });
});

// @route   GET api/university/:uid
// @desc    Return information of a university
// @access  Public
router.get('/:uid', (req, res) => {
  University.findByUid(req.params.uid)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send({ message: 'Not found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ message: 'Something went wrong' });
    });
});

module.exports = router;
