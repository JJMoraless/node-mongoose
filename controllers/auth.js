import { request, response } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generateJwt } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

export const login = async (req = request, res = response) => {
  const { password, correo } = req.body;

  try {
    const userFound = await Usuario.findOne({ correo });
    if (!userFound) {
      return res.status(400).json({
        msg: "credenciales invalidas - correo",
      });
    }

    if (!userFound.estado) {
      return res.status(400).json({
        msg: "credenciales invalidas - user borrado",
      });
    }

    const validPassword = bcryptjs.compareSync(password, userFound.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "credenciales invalidas - password",
      });
    }

    const token = await generateJwt(userFound.id);
    res.json({ msj: "login ok", user: userFound, token });
  } catch (error) {
    console.log("🚀 ~ file: auth.js:11 ~ login ~ error:", error);
    return res.status(500).json({
      msg: "algo salio mal hable con el administrador",
      error: `${error}`,
    });
  }
};

export const googleSingIn = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { nombre, img, correo } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        img,
        password: ":b",
        google: true,
        rol: "USER_ROLE",
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "hable con el administrador, usuario bloqueado",
      });
    }

    const token = await generateJwt(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log("🚀 ~ file: auth.js:73 ~ googleSingIn ~ error:", error);
    res.status(400).json({
      ok: false,
      msg: "no se pudo crear el token",
    });
  }
};
