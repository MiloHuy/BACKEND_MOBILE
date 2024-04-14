import dotenv from "dotenv";
import app from "./app";
import dbConnection from "./config/db.config";

process.on("uncaughtException", (err: any) => {
  console.log(`error: ${err.stack}`);
  console.log("Máy chủ bị tắt do Uncaugth exception");
  process.exit(1);
});

dotenv.config();

dbConnection().then(function () {
  const server = app.listen(process.env.SERVER_PORT_URL, () => {
    console.log(`Máy chủ chạy ở cổng: ${process.env.SERVER_PORT_URL}`);
  });

  process.on("unhandledRejection", (err: any) => {
    console.log(`Lỗi: ${err.stack}`);
    console.log("Máy chủ bị tắt do rejection Unhandle Promise");
    server.close(() => {
      process.exit(1);
    });
  });
})

