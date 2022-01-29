const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE new commnet
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
