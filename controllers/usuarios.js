import { response, request } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";

export const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const promiseCountUser = Usuario.countDocuments(query);
  const promiseUsersFound = Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite));
  const [total, usuarios] = await Promise.all([
    promiseCountUser,
    promiseUsersFound,
  ]);
  res.json({
    total,
    usuarios,
  });
};

export const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  usuario.password = bcryptjs.hashSync(password, 9);
  await usuario.save();
  res.json({
    msg: "post API - usuariosPost",
    usuario,
  });
};

export const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...restUser } = req.body;
  if (password) restUser.password = bcryptjs.hashSync(password, 9);
  const updatedUser = await Usuario.findByIdAndUpdate(id, restUser, {
    // findByIdAndUpdate actualiza campos, si hay nuevos campos no los agrega
    new: true,
  });
  res.json(updatedUser);
};

export const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

export const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const authenticatedUser = req.usuario;
  const userDeleted = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({ userDeleted, deleteBy: authenticatedUser });
};
