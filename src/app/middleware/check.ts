import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret = "01d87993-b0ab-4f9e-9204-ab057f69a58e";

const check = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.token) {
    jwt.verify(req.body.token, secret, {}, (err, decode) => {
      if (err) {
        console.error(err);
        res.status(403);
        res.json({
          err: "Token expired",
          data: err,
        });
      } else {
        next();
      }
    });
  } else {
    res.status(500);
    res.json({
      err: "Error",
      data: null,
    });
  }
};

export default check;
