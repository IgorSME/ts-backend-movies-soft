import { IError } from "../types/appType";

const messages: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const requestError = (status: number, message:string = messages[status]) => {
  const error:IError = new Error(message);
  error.status = status;
  return error;
};
export default requestError;
