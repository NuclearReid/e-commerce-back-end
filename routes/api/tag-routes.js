const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findAll(
      {include: [Product]}
    );
    if(!getTag){
      res.status(404).json({message: 'there are no tags'});
      return;
    }
    res.status(200).json(getTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findByPk( req.params.id,
      {
        include: [Product],
      }
    );
    if(!getTag){
      res.status(404).json({message: 'tag not found'});
      return;
    }
    res.status(200).json(getTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    
    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
        where:{
          id: req.params.id
        }
      }
    );
    if(!updateTag[0]){
      res.status(404).json({message: 'product with that id was not found'});
      return;
    }
    res.status(200).json(updateTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy(
      {
        where: {
          id: req.params.id,
        }
      }
    );
    if(!deleteTag){
      res.status(404).json({message: 'product not found'});
      return;
    }
    res.status(200).json(deleteTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
