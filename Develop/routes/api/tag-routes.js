const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: [{
      model: Product,
      through: ProductTag,
      as: 'tagged_products'
    }]
  });
  res.status(200).json(tagData)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagData = await Product.findByPk(req.params.id, {
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
        as: 'product_tags'
      }]
  });
  res.status(200).json(tagData);
});

router.post('/', async (req, res) => {
  // create a new tag
  const requestData = await Tag.create(req.body)
  res.status(200).json(req.body)
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const requestData = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(req.body)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const requestData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(req.body)
});

module.exports = router;
