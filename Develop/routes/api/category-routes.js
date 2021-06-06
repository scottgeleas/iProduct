const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);

});

router.post('/', async (req, res) => {
  // create a new category
  const requestData = await Category.create(req.body)
  res.status(200).json(req.body)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const requestData = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(req.body)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const requestData = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(req.body)
});

module.exports = router;
