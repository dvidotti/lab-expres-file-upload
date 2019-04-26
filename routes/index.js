const express = require('express');

const router = express.Router();
const multer = require('multer');
const Picture = require('../models/Picture');
const uploadCloud = require('../config/cloudnary');


/* GET home page */
router.get('/map', (req, res) => {
  res.render('map');
});


/* GET home page */
router.get('/', (req, res) => {
  Picture.find((err, pictures) => {
    res.render('index', { pictures });
  });
});

router.post('/upload', uploadCloud.single('photo'), (req, res) => {
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

  const pic = new Picture({
    name: req.body.name,
    path: imgPath,
    originalName: imgName,
  });

  pic.save()
    .then((pic) => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
});


// const upload = multer({ dest: './public/uploads/' });

// router.post('/upload', upload.single('photo'), (req, res) => {

//   const pic = new Picture({
//     name: req.body.name,
//     path: `/uploads/${req.file.filename}`,
//     originalName: req.file.originalname,
//   });

//   pic.save((err) => {
//     res.redirect('/');
//   });
// });

module.exports = router;
