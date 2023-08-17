import mongoose from "mongoose";
const atlas_uri = process.env.ATLAS_URI;

export const dbConection = async () => {
  try {
    await mongoose.connect(atlas_uri);
    console.log("base de datos online 🧙‍♂️ 🪄");
  } catch (error) {
    throw new Error("Error al incializar la base de datos", { error });
  }
};
