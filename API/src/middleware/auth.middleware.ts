import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

interface customRequest extends Request {
  user?: { username: String; email: String; id: String };
}
const authMiddleware = (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  //Controlleruud req,res gsn 2 parameter avdag bol middleware +next.
  //Controlleriin umnu ajillana.

  if (req.path.startsWith("/auth")) return next(); //REQ ni /auth pathaar ehelsen bol algasna. Uchir ni login,signup huseltuuded token shalgah shaardlagagui. Busad REQ-d auth shaardana.

  const auth = req.headers.authorization; //Req-header-s token-oo avna.

  const token = auth?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Нэвтэрнэ үү!" }); //Hervee token bhgui bol aldaa butsaana.

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); //Hervee token baival ter tokeng zuv token esehig shalgana.

    req.user = user; //Hervee aldaagui bol user gdg dotor payload orood req.userd hadgalna.

    next(); //Daraagiin uildelruu yvulsan.
  } catch (err) {
    return res.status(401).json({ error: "Нэвтэрнэ үү!" }); //Hervee shalgalt amjiltgui bol aldaa butsaana.
  }
};
export { authMiddleware };
