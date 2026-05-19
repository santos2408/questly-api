import type { Request, Response } from "express";
import type { Controller, HttpRequest } from "../../presentation/protocols/index.js";

export const routeAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = { body: req.body };
    const httpResponse = await controller.handle(httpRequest);
    const errorStatusCode = httpResponse.statusCode > 399 && httpResponse.statusCode <= 599;

    if (errorStatusCode) {
      res.status(httpResponse.statusCode).json({ name: httpResponse.body.name, error: httpResponse.body.message });
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    }
  };
};
