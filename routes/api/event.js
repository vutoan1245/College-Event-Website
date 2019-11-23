const express = require('express');
const passport = require('passport');
const moment = require('moment');

const Event = require('../../models/Event');
const PublicEvent = require('../../models/PublicEvent');
const PrivateEvent = require('../../models/PrivateEvent');
const NonRso = require('../../models/NonRso');

const router = express.Router();

// @route   POST api/event/all
// @desc    List of all events based on access level
// @access  Student
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { uid } = req.user;

    Promise.all([PublicEvent.findAll(), PrivateEvent.findAllByUid(uid)])
      .then(results => {
        const eventList = [...results[0], ...results[1]];

        res.status(200).json(eventList);
      })
      .catch(err => {
        console.log(err);
        res.send(400).json({ message: 'Something went wrong' });
      });
  }
);

// @route   POST api/event/:eid
// @desc    Return full event information
// @access  Student
router.get(
  '/:eid',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { eid } = req.params;

    Event.findByEid(eid)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
      });
  }
);

// @route   POST api/event/create
// @desc    Create rso
// @access  Student
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { pid, aid, uid } = req.user;
    const {
      name,
      description,
      type,
      date,
      email,
      phone,
      lname,
      address,
      category
    } = req.body;

    const location = {
      lname,
      address
    };

    const newEvent = {
      name,
      description,
      time: moment(date).format('YYYY-MM-DD HH:mm:ss'),
      location,
      category,
      email: email || 'no@email.com',
      phone: phone || '(***) ***-****'
    };

    Event.add(newEvent)
      .then(eid => {
        res.status(200).json({ eid });

        if (type === 'Non RSO') {
          return NonRso.add({ eid, pid, uid });
        } else if (type === 'Public') {
          return PublicEvent.add({ eid, aid });
        } else if (type === 'Private') {
          return PrivateEvent.add({ eid, aid, uid });
        } else if (type === 'RSO') {
        }
      })
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({ err });
      });
  }
);

module.exports = router;
