const { Router } = require("express");

const { Product, Category, Tag, ProductTag } = require("../../models");

const router = Router();

// get all products
router.get("/", async (req, res) => {
  try {
    const getAllProducts = await Product.findAll(req.params.all, {
      include: [{ model: Category, Tag }],
    });
    res.status(200).json(getAllProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find a single product by its `id`
router.get("/:id", async (req, res) => {
  try {
    const getProduct = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ["id", "Category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "Tag_name"],
        },
      ],
    });

    if (!getProduct) {
      return res.status(404).json({ message: "No 'Category by Id' found" });
    }
    return res.json(getProduct);
  } catch (error) {
    console.error(`[ERROR]: Failed to get product | ${error.message}`);
    return res.status(500).json({ error: "Failed to get product" });
  }
});
// create a product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete a product by id
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }

    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({ message: "Successfully deleted product" });
  } catch (error) {
    console.error(`[ERROR]: Failed to delete product | ${error.message}`);
    return res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
