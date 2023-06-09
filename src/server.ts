import mongoose from "mongoose";
import app from "./app";

mongoose.set("strictQuery", false);

const { DB_HOST, PORT = '3003' }:NodeJS.ProcessEnv = process.env;

if (!DB_HOST) {
  console.error("DB_HOST is not defined");
  process.exit(1);
}

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error:Error) => {
    console.log(error.message);
    process.exit(1);
  });
