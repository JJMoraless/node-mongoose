import mongoose from "mongoose";
import "dotenv/config";

export const dbConection = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("base de datos online 🧙‍♂️ 🪄");
  } catch (error) {
    throw new Error("Error al incializar la base de datos", { error });
  }
};
