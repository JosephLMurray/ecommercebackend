const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try {
  const tagData = await Tag.findAll({ include: [{ model: Product, through: ProductTag, as: 'products' }]
  });
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
  const tagData = await Tag.findByPk(req.params.id, {
    
    include: [{ model: Product, through: ProductTag, as: 'products' }]
  });

  if (!tagData) {
    res.status(404).json({ message: 'No tag found with this id!' });
    return;
  }

  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
    try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  //update a tag's name by its `id` value
  Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      name: req.body.name,
    },
    {
      // Gets the tag based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      // Sends the updated tag as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
    try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;