import { validationResult } from "express-validator";

/**
 * los middlwares de express validator acumulan los errores en el objeto de tipo request
 * y la funcion de validationResult los valida y los extrae
 *
 * */

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

export default validarCampos;
