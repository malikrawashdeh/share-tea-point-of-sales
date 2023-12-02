// swaggerOptions.js
module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Next.js API Documentation",
      version: "1.0.0",
      description: "API documentation for your Next.js API routes",
    },
  },
  // Adjust the path based on your project structure
  apis: ["pages/api/*.ts"],
};
