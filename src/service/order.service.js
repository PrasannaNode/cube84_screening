const Sequelize = require("sequelize");
const { auth, order, product } = require("../database/models/index");

class OrderService {}

OrderService.prototype.checkProduct = async (req, res, products) => {
  try {
    for (let v of products) {
      let productData = await product.findOne({
        where: { id: v.productId },
      });

      if (v.quantity > productData.stock) {
        return false;
      }
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

OrderService.prototype.createOrder = async (req, res, body, userId) => {
  try {
    let totalAmount = [];
    finalProduct = [];
    for (let w of body.products) {
      //to find single price
      let findPrice = await product.findOne({
        where: { id: w.productId },
      });
      let price = findPrice.price;
      //to find total amount of single product
      let singlePrice = price * w.quantity;

      totalAmount.push(singlePrice);
      let ProductData = {
        productId: w.productId,
        quantity: w.quantity,
        singlePrice: price,
      };
      finalProduct.push(ProductData);
    }

    //to find overall amount
    const sum = totalAmount.reduce((partialSum, a) => partialSum + a, 0);

    let productData = await order.create({
      products: finalProduct,
      totalPrice: sum,
      addressLine1: body.addressLine1,
      addressLine2: body.addressLine2,
      city: body.city,
      state: body.state,
      userId: userId,
    });

    //to update stock after creating order
    if (productData) {
      for (let v of body.products) {
        //to find overall quantity
        let findQuantity = await product.findOne({
          where: { id: v.productId },
        });

        let updateQuantity = findQuantity.stock - v.quantity;
        await product.update(
          { stock: updateQuantity },
          { where: { id: v.productId } }
        );
      }
    }

    return productData;
  } catch (error) {
    throw new Error(error);
  }
};

OrderService.prototype.updateOrder = async (req, res, body) => {
  try {
    let totalAmount = [];

    for (let w of body.products) {
      //to find single price
      let findPrice = await product.findOne({
        where: { id: w.productId },
      });
      let price = findPrice.price;
      //to find total amount of single product
      let singlePrice = price * w.quantity;

      totalAmount.push(singlePrice);
    }

    //to find overall amount
    const sum = totalAmount.reduce((partialSum, a) => partialSum + a, 0);

    let productData = await order.update(
      {
        products: body.products,
        price: sum,
      },
      { where: { id: body.orderId } }
    );

    let findUpdatedOrders = await order.findOne({
      where: { id: body.orderId },
    });

    return productData;
  } catch (error) {
    throw new Error(error);
  }
};

OrderService.prototype.cancelOrder = async (orderId) => {
  try {
    let cancelOrder = await order.destroy({
      where: { id: orderId },
    });
    return cancelOrder;
  } catch (error) {
    throw new Error(error);
  }
};

OrderService.prototype.findOrder = async (orderId) => {
  try {
    let findOrder = await order.findOne({
      where: { id: orderId },
    });
    return findOrder;
  } catch (error) {
    throw new Error(error);
  }
};

OrderService.prototype.findUser = async (userId) => {
  try {
    let findUser = await auth.findOne({
      where: { id: userId },
    });
    return findUser;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = new OrderService();
