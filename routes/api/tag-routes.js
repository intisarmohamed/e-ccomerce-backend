const { Router } = require("express");

const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

const router = Router();

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTags = await Tag.findAll();
    res.status(200).json(getTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product, ProductTag, as: "tag_data" }],
    });

    if (!getTag) {
      res.status(404).json({ message: "No tags found with this id!" });
      return;
    }

    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: "No tags found with this id" });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
