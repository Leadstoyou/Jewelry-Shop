import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "Swagger JEWELRY SHOP - OpenAPI 3.0",
      description: "PROJECT SDN",
      termsOfService:
        "https://docs.google.com/spreadsheets/d/1R2fpNLx-H0VYpIQADfsMWJ_1F9cbCukkhc7RkuMsX0k/edit#gid=0",
      contact: {
        email: "maitranhuy1709@gmail.com",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
      version: "1.0.11",
    },
    externalDocs: {
      description: "Find out more about Swagger",
      url: "http://swagger.io",
    },
    servers: [
      {
        url: "http://localhost:9999/api/v1",
      },
    ],
  },
  apis: ["./openAPI/*.yaml"],
  security: [
    {
      BearerAuth: [],
    },
  ],
  securityDefinitions: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
