const { Router } = require("express");

const { Tag, Product, ProductTag } = require("../../models");

const router = Router();
// get all tags
router.get("/", async (req, res) => {
  try {
    const getAllTags = await Tag.findAll();
    res.status(200).json(getAllTags);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get one tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    const getTagById = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!getTagById) {
      return res.status(404).json({ message: "No product with this id" });
    }

    return res.json(getTagById);
  } catch (error) {
    console.error(`[ERROR]: Failed to get tag | ${error.message}`);
    return res.status(500).json({ error: "Failed to get tag" });
  }
});
// create a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    return res.json(newTag);
  } catch (error) {
    console.error(`[ERROR]: Failed to create tag | ${error.message}`);
    return res.status(500).json({ error: "Failed to create tag" });
  }
});

// delete a tag by id
router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: "No tag found" });
    }

    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({ message: "Successfully deleted tag" });
  } catch (error) {
    console.error(`[ERROR]: Failed to delete tag | ${error.message}`);
    return res.status(500).json({ error: "Failed to delete tag" });
  }
});

module.exports = router;
