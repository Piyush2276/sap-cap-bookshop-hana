
const cds = require("@sap/cds");
//const proxy = require("@sap/cds-odata-v2-adapter-proxy");
const cors = require("cors");

// Step 1: Access env vars
// const deployAttributes = process.env.DEPLOY_ATTRIBUTES 
//   ? JSON.parse(process.env.DEPLOY_ATTRIBUTES)
//   : {};

  const deployAttributes = {
    "authURL" : process.env.authURL,
    "clientID" : process.env.clientID,
    "clientSecret": process.env.clientSecret
  }

console.log("DEPLOY_ATTRIBUTES:", deployAttributes);

// Example: Get app-content-digest
// const digest = deployAttributes["app-content-digest"] || "not found";

cds.on("bootstrap", (app) => {
  // Enable CORS
  app.use(cors());

  // Add a custom endpoint to expose this to frontend
  app.get("/deploy-info", (req, res) => {
    res.json({ deployAttributes });
  });

  //app.use(proxy());
});

module.exports = cds.server;
