const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const productController = require("./controllers/productController");
const orderController = require("./controllers/orderController");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const cognito = require("./configurations/cognito");
const { verifyToken } = require("./middleware/verifyToken");
const adminRoutes = require("./middleware/adminRoutes");

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 3000;

//cognito setting
const userPool = cognito.userPool;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini Project BFF API",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Products",
        description: "Endpoints for managing products",
      },
      {
        name: "Orders",
        description: "Endpoints for managing Orders",
      },
      {
        name: "Users",
        description: "Endpoints for managing Users",
      },
    ],
  },
  apis: [
    "./controllers/orderController.js",
    "./controllers/userController.js",
    "./controllers/productController.js",
  ],
};

const openApiSpecification = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/products", productController);
app.use("/api/v1/orders", verifyToken, orderController);
app.use("/api/v1/users", verifyToken, userController);
app.use("/api/v1/auth", authController);

app.listen(port, () => {
  console.log(`Bff is running on port: ${port}`);
  console.log(
    `Swagger docs can access from here: http://localhost:${port}/api-docs`
  );
});
