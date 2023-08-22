import jwt from "jsonwebtoken";

/**
 * @param {user identifier} uid
 * @returns jsonwebtoken
 */
export const generateJwt = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) return reject("no se pudo generar el json web token");
        return resolve(token);
      }
    );
  });
};
