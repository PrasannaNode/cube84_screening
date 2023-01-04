const orderService = require("./../service/order.service");
const notificationService = require("./../service/notification.service");
const { messages, status, constants } = require("./../configs");
const Response = require("../responses/responses");

class OrderController {}

OrderController.prototype.createOrder = async (req, res, next) => {
  try {
    // to check product availability
    let body = req.body;
    let userEmail = req.user.email;
    let userId = req.user.id;
    let product = body.products;
    let checkProduct = await orderService.checkProduct(req, res, product);

    if (checkProduct == false) {
      return Response.errors(
        req,
        res,
        status.HTTP_BAD_REQUEST,
        messages.outOfStock
      );
    }
    let datas = await orderService.createOrder(req, res, body, userId);

    //to send order confirmation mail to the user
    if (datas) {
      let sendMail = await notificationService.sendMail(userEmail);
    }
    return Response.success(
      req,
      res,
      status.HTTP_OK,
      datas,
      messages.orderCreated
    );
  } catch (error) {
    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

OrderController.prototype.updateOrder = async (req, res, next) => {
  try {
    let data = await orderService.updateOrder(req, res, req.body);

    return Response.success(
      req,
      res,
      status.HTTP_OK,
      data,
      messages.orderUpdated
    );
  } catch (error) {
    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

OrderController.prototype.cancelOrder = async (req, res, next) => {
  try {
    let orderId = req.body.orderId;
    let data = await orderService.cancelOrder(orderId);
    return Response.success(
      req,
      res,
      status.HTTP_OK,
      data,
      messages.orderCancelled
    );
  } catch (error) {
    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

module.exports = new OrderController();
