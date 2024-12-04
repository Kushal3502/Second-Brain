import dotenv from "dotenv";
import connectDB from "./db";
import app from "./app";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => console.log("Error :: ", error));
    app.listen(port, () => console.log("Server is running on port :: ", port));
  })
  .catch((error) => console.log("Error :: ", error));
