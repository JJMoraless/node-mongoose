import { request, response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

export const validarJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuarioFound = await Usuario.findById(uid);

    if (!usuarioFound) {
      return res.status(401).json({
        msg: "token no valido - usuario no existe",
      });
    }

    if (!usuarioFound.estado) {
      return res.status(401).json({
        msg: "token no valido - usuario ha eliminado su cuenta",
      });
    }

    req.usuario = usuarioFound;
    next();
  } catch (error) {
    console.log("🚀 ~ file: validar-jwt.js:17 ~ validarJwt ~ error:", error);
    res.status(401).json({ msg: "token no valido" });
  }
};
