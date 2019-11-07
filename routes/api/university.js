const express = require('express');
const University = require('../../models/University');

const router = express.Router();

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
