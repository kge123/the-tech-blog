const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE newpost
router.post("/", withAuth, async (req, res) => {
  const body = req.body;
  try {
    const dbPostData = await Post.create({...body, 
      userId: req.session.userId,
    });

    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//edit post
router.put("/:id", withAuth, async (req, res) => {

});

// Delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
  

});

module.exports = router;
