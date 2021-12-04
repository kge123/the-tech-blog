const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Post, Comment } = require("../models");

// GET all POSTs for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [User],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    //   // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render("homepage", { loggedIn: req.session.loggedIn, posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = dbPostData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'gallery' template
    res.render("single", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("dashboard", { loggedIn: req.session.loggedIn, posts });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/new", withAuth, async (req, res) => {
  res.render("create", { loggedIn: req.session.loggedIn });
});

// GET one post
router.get("/edit/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);

    const post = dbPostData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'gallery' template
    res.render("edit", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

module.exports = router;
