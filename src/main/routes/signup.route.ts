import type { Request, Response, Router } from "express";

export default (router: Router) => {
  router.post("/signup", (req: Request, res: Response) => {
    res.statusCode = 201;
    res.json({ success: true });
  });
};
