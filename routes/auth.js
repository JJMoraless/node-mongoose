import { Router } from "express";
import { googleSingIn, login } from "../controllers/auth.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos.js";
const router = Router();

router.post(
  "/login",
  [
    check("correo", "correo invalido").isEmail(),
    check("password", "password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "token de google necesario").not().isEmpty(),
    validarCampos,
  ],
  googleSingIn
);

export default router;
