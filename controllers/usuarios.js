import { response, request } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";

export const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

export const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // vefiricar si correo existe
  const isEmail = await Usuario.findOne({ correo });
  if (isEmail)
    return res.status(400).json({ msg: "email already registered" });

  // encriptar password
  usuario.password = bcryptjs.hashSync(password, 9);

  await usuario.save();
  res.json({
    msg: "post API - usuariosPost",
    usuario,
  });
};

export const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API - usuariosPut",
    id,
  });
};

export const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

export const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - usuariosDelete",
  });
};
