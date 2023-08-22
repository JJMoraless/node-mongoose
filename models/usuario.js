import { model, Schema } from "mongoose";

const usuarioShema = Schema({
  nombre: {
    type: String,
    required: [true, "nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioShema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("Usuario", usuarioShema);
