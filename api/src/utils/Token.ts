import { TypeObject } from "@andrewcaires/utils.js";
import { sign, verify } from "jsonwebtoken";

import { crt, key } from "../ssl";

interface TokenSign {
  error?: string;
  token?: string;
}

interface TokenVerify {
  error?: string;
  decode?: TypeObject<string | number | boolean>;
}

export class Token {

  static sign(payload: TypeObject<string | number>): TokenSign {

    if (!key.token) {

      return { error: "Invalid Secret" };
    }

    return { token: sign(payload, key.token, { algorithm: "RS256" }) };
  }

  static verify(token: string): TokenVerify {

    if (!crt.token) {

      return { error: "Invalid Secret" };
    }

    if (!token || token.split(".").length < 3) {

      return { error: "Invalid Token" };
    }

    try {

      return { decode: verify(token, crt.token) as any };

    } catch (error) {

      return { error: "Invalid Token" };
    }
  }
}
