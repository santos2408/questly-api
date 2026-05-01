import type { HttpResponse } from "../protocols/http";
import { ServerError } from "../errors";

// TODO: corrigir retorno de status created, o correto é 201
export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
