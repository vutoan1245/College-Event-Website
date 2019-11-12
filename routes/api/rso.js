const express = require("express");
const University = require("../../models/University");
const passport = require("passport");
const router = express.Router();
const Rso = require("../../models/Rso");
const Admin = require("../../models/Admin");
const RsoMember = require("../../models/RsoMember");
// @route   POST api/../rso/create
// @desc    Create rso
// @access  Student
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, description, admin, member } = req.body;
    Admin.add(admin)
      .then(aid => {
        const newRso = { name, description, aid };
        Rso.findByName(name)
          .then(rso => {
            if (rso)
              return res.status(400).json({ message: "Rso name exists" });
            else {
              Rso.add(newRso)
                .then(rid => {
                  Promise.all(
                    member.map(mem => {
                      mem["rid"] = rid;
                      RsoMember.add(mem);
                    })
                  )
                    .then(() => res.status(200).json({ message: "OK" }))
                    .catch(() =>
                      res.status(400).json({
                        message: "Something wrong when add new members"
                      })
                    );
                })
                .catch(() =>
                  res
                    .status(400)
                    .json({ message: "Something wrong when add new rso" })
                );
            }
          })
          .catch(() => {
            res.status(400).json({ message: "Something wrong when add admin" });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ message: "Something wrong when add admin" });
      });
  }
);

// @route   POST api/../rso/join
// @desc    Join an rso
// @access  Student
router.post(
  "/join",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { pid } = req.user;
    const { rid } = req.body;
    RsoMember.findByPidAndRid(pid, rid)
      .then(mem => {
        if (mem) {
          return res
            .status(400)
            .json({ message: "You already joined this rso" });
        } else {
          RsoMember.add({ pid, rid })
            .then(() => res.status(200).json({ message: "Success" }))
            .catch(() => res.status(400).json({ message: "Something wrong" }));
        }
      })
      .catch(() => res.status(400).json({ message: "Something wrong" }));
  }
);

// @route   POST api/../rso/leave
// @desc    leave an rso
// @access  Student
router.delete(
  "/leave",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { pid } = req.user;
    const { rid } = req.body;
    RsoMember.delete({ pid, rid })
      .then(() => res.status(200).json({ message: "Success" }))
      .catch(() => res.status(400).json({ message: "Something wrong" }));
  }
);

// @route   POST api/../rso/$uid/list
// @desc    list all in a university
// @access  Public
router.get("/:uid/list", (req, res) => {
  const { uid } = req.params;
  Rso.findByUid(uid)
    .then(data => res.status(200).json({ data }))
    .catch(() => res.status(400).json({ message: "Something wrong" }));
});

module.exports = router;
