"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    //Controlleruud req,res gsn 2 parameter avdag bol middleware +next.
    //Controlleriin umnu ajillana.
    if (req.path.startsWith("/auth") ||
        req.path.startsWith("/product") ||
        req.path.startsWith("/category") ||
        req.path.startsWith("/order"))
        return next(); //REQ ni /auth pathaar ehelsen bol algasna. Uchir ni login,signup huseltuuded token shalgah shaardlagagui. Busad REQ-d auth shaardana.
    const auth = req.headers.authorization; //Req-header-s token-oo avna.
    const token = auth === null || auth === void 0 ? void 0 : auth.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Нэвтэрнэ үү!" }); //Hervee token bhgui bol aldaa butsaana.
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET); //Hervee token baival ter tokeng zuv token esehig shalgana.
        req.user = user; //Hervee aldaagui bol user gdg dotor payload orood req.userd hadgalna.
        next(); //Daraagiin uildelruu yvulsan.
    }
    catch (err) {
        return res.status(401).json({ error: "Нэвтэрнэ үү!" }); //Hervee shalgalt amjiltgui bol aldaa butsaana.
    }
};
exports.authMiddleware = authMiddleware;
