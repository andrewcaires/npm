import cors from "cors";
import express, { NextFunction, Request, Response, Router } from "express";
import { existsSync } from "fs";

import { API_HTTP_CROSS, API_HTTP_PUBLIC } from "./config";
import { router as routes } from "./routes";
import { Log, Responses } from "./utils";

export const app = express();

app.use(express.json());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

  if (error) {

    Log.error(error.message, "express");

    return Responses.error(res, "Internal Server Error");
  }

  return next();
});

app.use(express.urlencoded({ extended: true }));

app.disable("x-powered-by");

if (API_HTTP_CROSS) {

  app.use(cors());
}

export const router = Router();

app.use("/api", router);

app.use("/api", routes);

app.all("/api/*", (req: Request, res: Response) => {

  return Responses.notfound(res, "Invalid API");
});

if (API_HTTP_PUBLIC) {

  if (existsSync(API_HTTP_PUBLIC)) {

    app.use(express.static(API_HTTP_PUBLIC));
  }

  app.get("*", (req: Request, res: Response) => {

    if (!existsSync(API_HTTP_PUBLIC)) {

      return Responses.notfound(res, "File \"index.html\" not found");
    }

    res.sendFile(API_HTTP_PUBLIC + "/index.html");
  });
}
