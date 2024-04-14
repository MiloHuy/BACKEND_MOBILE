import mongoose from "mongoose";

const dbConnection = async () => {
  if (!process.env.MONGO_ENV_URL) {
    console.error('MONGO_ENV_URL is not defined');
    process.exit(1);
  }

  return mongoose.connect(process.env.MONGO_ENV_URL).then(function (con) {
    console.log("Đã kết nối MongoDB với HOST: " + con.connection.host);
  }).catch(function (error) {
    console.error("Lỗi kết nối MongoDB: " + error.message);
    process.exit(1);
  });
};

export default dbConnection;
