
const initializeRoutes = (app) => {
  app.use("/api/v1/auth", require("./v1/auth.routes"));
  app.use("/api/v1/product", require("./v1/product.routes"));
  app.use("/api/v1/orders", require("./v1/order.routes"));
  app.use("/api/v1/invoice", require("./v1/invoice.routes"));
};

module.exports = initializeRoutes;
