const { Router } = require("express");

const { Category, Product } = require("../../models");

const router = Router();
//get all categories
router.get("/", async (req, res) => {
  try {
    const getAllCategories = await Category.findAll();
    res.status(200).json(getAllCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get a category by id
router.get("/:id", async (req, res) => {
  try {
    const getCategoryById = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!getCategoryById) {
      res.status(404).json({ message: "No category with this id" });
      return;
    }

    res.status(200).json(getCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by id
router.delete("/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.findByPk(req.params.id);

    if (!deleteCategory) {
      return res.status(404).json({ message: "No category found" });
    }

    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({ message: "Successfully deleted category" });
  } catch (error) {
    console.error(`[ERROR]: Failed to delete category | ${error.message}`);
    return res.status(500).json({ error: "Failed to delete category" });
  }
});
module.exports = router;
