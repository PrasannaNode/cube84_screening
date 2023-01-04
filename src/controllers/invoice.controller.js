const orderService = require("./../service/order.service");
const productService = require("./../service/product.service");
const { messages, status } = require("./../configs");
const Response = require("../responses/responses");
var easyinvoice = require("easyinvoice");
const fs = require("fs");
class InvoiceController {}

InvoiceController.prototype.generateInvoice = async (req, res, next) => {
  try {
    let productData = [];

    let orderId = req.body.orderId;
    let findOrder = await orderService.findOrder(orderId);

    var datetime = new Date();

    let currentDate = datetime.toISOString().slice(0, 10);

    //to find user data
    let findUser = await orderService.findUser(findOrder.userId);

    //to list the ordered products
    for (let v of findOrder.products) {
      //to find the product name
      let findOrder = await productService.getSingleProduct(v.productId);

      let data = {
        quantity: 2,
        description: findOrder.productName,
        "tax-rate": 0,
        price: findOrder.price,
      };
      productData.push(data);
    }
    var data = {
      images: {
        // The logo on top of invoice
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
        // The invoice background
        background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
      },
      // our data
      sender: {
        company: "CUBE 84",
        address: "chennai",
        zip: "01010101",
        city: "chennai",
        country: "India",
      },
      // Your recipient
      client: {
        company: findUser.userName,
      },
      information: {
        // Invoice number
        number: "ORDERID_" + findOrder.id,
        date: currentDate,
      },
      // The products to show on invoice
      products: productData,
      // The message to display on the bottom of invoice
      "bottom-notice": "THANK YOU FOR SHOPPING WITH US",
      // Settings to customize your invoice
      settings: {
        currency: "INR",
      },
    };

    //Creating invoice
    easyinvoice.createInvoice(data, async function (result) {
      let finslPDF = await fs.writeFileSync(
        "invoice.pdf",
        result.pdf,
        "base64"
      );
      return Response.success(
        req,
        res,
        status.HTTP_OK,
        messages.invoiceSuccesfull
      );
    });
  } catch (error) {
    next({
      status: status.HTTP_INTERNAL_SERVER_ERROR,
      message: JSON.stringify({ message: error.message, stack: error.stack }),
    });
  }
};

module.exports = new InvoiceController();
