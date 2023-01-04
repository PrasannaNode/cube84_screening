const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const { auth, product } = require("../database/models/index");
const { paginationData } = require("../utils/pagination");

class ProductService {}

ProductService.prototype.addProduct = async (req, res, storeList) => {
  try {
    for (let docs of storeList) {
      let productData = await product.create({
        productName: docs.A,
        price: docs.B,
        stock: docs.C,
      });
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

ProductService.prototype.getProduct = async (limit, page) => {
  try {
    let productData = await product.findAndCountAll({
      where: { stock: { [Op.gt]: 0 } },
      distinct: true,
      offset: parseInt(limit * (page - 1)),
      limit: limit,
    });

    return paginationData(limit, page, productData);
  } catch (error) {
    throw new Error(error);
  }
};

ProductService.prototype.getSingleProduct = async (orderId) => {
  try {
    let productData = await product.findOne({
      where: { id: orderId },
    });
    return productData;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = new ProductService();
