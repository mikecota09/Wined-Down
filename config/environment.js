import dotenv from "dotenv";
dotenv.config();

export const secret = process.env.SECRET || "secrettt";

export const port = process.env.PORT || 8000;

const environment = process.env.NODE_ENV || "development";

export const dbURI =
  environment === "production"
    ? process.env.MONGODB_URI
    : `mongodb://localhost/db-${environment}`;
