const dotenv = require("dotenv");
const app = require("./app");
const path = require('path')

// Catching exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION");
  console.log(err.name, err.message);
  process.exit(1);
});

// dotenv configuration
dotenv.config({ path: path.join(__dirname, './config/config.env') });

//  port declarations
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App is running on port ${port} in ${process.env.NODE_ENV} mode`);
});

// Catching rejections
process.on("uncaughtRejection", (err) => {
  console.log("UNCAUGHT REJECTION");
  console.log(err.name, err.message);
  process.exit(1);
});
