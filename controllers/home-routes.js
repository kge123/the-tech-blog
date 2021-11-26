const router = require("express").Router();
const withAuth = require("../utils/auth");

// GET all POSTs for homepage
router.get("/", async (req, res) => {
  // try {
  //   const dbGalleryData = await Gallery.findAll({
  //     include: [
  //       {
  //         model: Painting,
  //         attributes: ['filename', 'description'],
  //       },
  //     ],
  //   });
  //   const galleries = dbGalleryData.map((gallery) =>
  //     gallery.get({ plain: true })
  //   );
  //   // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('homepage', {loggedIn: req.session.loggedIn});
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
});

// GET one gallery
// router.get('/gallery/:id', async (req, res) => {
//   try {
//     const dbGalleryData = await Gallery.findByPk(req.params.id, {
//       include: [
//         {
//           model: Painting,
//           attributes: [
//             'id',
//             'title',
//             'artist',
//             'exhibition_date',
//             'filename',
//             'description',
//           ],
//         },
//       ],
//     });

//     const gallery = dbGalleryData.get({ plain: true });
//     // Send over the 'loggedIn' session variable to the 'gallery' template
//     res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get("/dashboard", withAuth, async (req, res) => {
  res.render("dashboard", { loggedIn: req.session.loggedIn });
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
