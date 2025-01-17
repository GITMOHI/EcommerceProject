const express = require('express');
const { createProduct, insertAll, fetchAllProducts, fetchProductById, fetchBestSellers, fetchNewArrivals, updateProduct, deleteProduct, searchItem } = require('../controllers/Products');
const { isAdmin } = require('../controllers/Admin/Auth');
const multer = require('../middlewares/multer.js');

const router = express.Router();

router.post('/',isAdmin,multer.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 },
      ]),
      createProduct)
      .get('/',fetchAllProducts)
      .get('/new_arrivals',fetchNewArrivals)
      .get('/bestSellers',fetchBestSellers)
      .get('/search',searchItem)
      .get('/:id',fetchProductById)
      .delete('/delete/:id',isAdmin,deleteProduct)
      .post('/bulk', insertAll)
      .patch('/update/:id',updateProduct)
      
exports.router = router;