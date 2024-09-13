import { connect } from "mongoose";

export const connectToDatabase = async () => {
  //Ene function mongoDB-tei holboj ugnu
  await connect(
    "mongodb+srv://zjergsen:rkqUPLRTcpJlkBBU@cluster0.kbbcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  console.log("Connected to database");
};
