const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey,
      autoIncrement,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: product_id,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: tag_id,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;

/* id
Integer.
Doesn't allow null values.
Set as primary key.
Uses auto increment.

product_id
Integer.
References the Product model's id.

tag_id
Integer.
References the Tag model's id.*/
