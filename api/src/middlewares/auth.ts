import { NextFunction, Request, Response } from "express";

import { API_TOKEN_HEADER, API_TOKEN_LIFETIME } from "../config";
import { Auth, User } from "../models";
import { Log, Responses, Token } from "../utils";

declare global {
  namespace Express {
    interface Request {
      auth?: Auth;
      user?: User;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.get(API_TOKEN_HEADER) || "";

  const { error, decode } = Token.verify(token);

  if (error) {

    return Responses.error(res, error);
  }

  if (decode) {

    const { id, secret } = decode;

    if (id && decode) {

      const user = await User.findOne({

        where: { id, state: true },

      }).catch((error) => {

        Log.error(error.message, "token.check");
      });

      if (user) {

        const auth = await Auth.findOne({

          where: { secret, userId: user.id },

        }).catch((error) => {

          Log.error(error.message, "token.check");
        });

        if (auth) {

          const time = Date.now();

          if (time > auth.timestamp) {

            return Responses.error(res, "Expired token");
          }

          auth.timestamp = time + (API_TOKEN_LIFETIME * 60000);

          const useragent = req.get("User-Agent");

          if (useragent) {

            auth.useragent = useragent;
          }

          await auth.save();

          req.auth = auth;
          req.user = user;

          return next();
        }
      }

      return Responses.error(res, "Access denied");
    }
  }

  return Responses.error(res, "Invalid token");
};
