const  express = require('express');
const blogController = require('../controller/blogController');
const router = express.Router();

router.get('/', blogController.blogindex);
router.post('/', blogController.blogdetails);
router.get('/add-blog', blogController.blogadd);
router.get('/:id', blogController.blogget);
router.delete('/:id', blogController.blogdelete);

module.exports = router;