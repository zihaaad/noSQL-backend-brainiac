import mongoose from "mongoose";
import {TErrorDocs, TGenericErrorResponse} from "../interfaces/error";

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorDocs: TErrorDocs = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );

  return {
    statusCode,
    message: "Validation Error",
    errorDocs,
  };
};
