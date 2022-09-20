const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Simone - Pass social media result into step 2 page
router.get('/simone/task/step-two', function (req, res) {

    let itemClicked;

    switch(req.query.link) {
        case '1':
            itemClicked = 'Twitter';
          break;
        case '2':
            itemClicked = 'Facebook';
          break;
        case '3':
            itemClicked = 'Instagram';
          break;
        case '4':
            itemClicked = 'YouTube';
          break;
        default:
          itemClicked = 'Unknown';
      }

    res.render('simone/task/step-two', { social: itemClicked })
})

module.exports = router
