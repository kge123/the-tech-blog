const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require("../../utils/auth");

// CREATE new commnet
router.post('/', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
