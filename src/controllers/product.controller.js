const productService = require("./../service/product.service");
const { messages, status, constants } = require("./../configs");
const Response = require("../responses/responses");
const { response } = require("express");
const excelToJson = require("convert-excel-to-json");

class ProductController {}

ProductController.prototype.addProduct = async (req, res, next) => {
  try {
   
    let file = req.files;
    let exceldata = excelToJson({
      sourceFile: `${file[0].path}`,
    });
    let data = exceldata.Sheet1;
    let productList = data.slice(1);
    if (productList.length === 0) {
      return response.success(req, res, 422, {}, `Excel is empty can't import`);
    }
    let datas = await productService.addProduct(req, res, productList);
    return Response.success(
      req,
      res,
      status.HTTP_OK,
      messages.productUploadSuccess
    );
  } catch (error) {

    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

ProductController.prototype.getProduct = async (req, res, next) => {
  try {

    let limit = req.query.limit ? parseInt(req.query.limit) : 10
    let page = req.query.page ? parseInt(req.query.page) : 1


    let data = await productService.getProduct(limit, page);
    return Response.success(
      req,
      res,
      status.HTTP_OK,
      data,
      messages.productListed
    );
  } catch (error) {

    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

module.exports = new ProductController();
