import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = "01d87993-b0ab-4f9e-9204-ab057f69a58e";
const users = [
  {
    email: "user@fake.com",
    password: "faKe123",
  },
];

const auth = (req: Request, res: Response, _next: NextFunction) => {
  if (req.body.email && req.body.password) {
    const user = users.find((user) => user.email === req.body.email);
    if (user) {
      if (user.password === req.body.password) {
        res.status(200);
        res.json({
          err: null,
          data: {
            token: jwt.sign(
              {
                id: user.email,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 60 * 5,
              },
              secret
            ),
          },
        });
      } else {
        res.status(403);
        res.json({
          err: "Wrong infos send to the server",
          data: null,
        });
      }
    } else {
      res.status(404);
      res.json({
        err: "User not found",
        data: null,
      });
    }
  } else {
    res.status(500);
    res.json({
      err: "Error",
      data: null,
    });
  }
};

export default auth;
