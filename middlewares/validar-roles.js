import { request, response } from "express";

export const tieneRol =
  (...roles) =>
  (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "error, se quiere verificar role sin antes validar token",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `el servicio requiere uno de estos roles: ${roles.join(", ")}`,
      });
    }

    next();
  };
