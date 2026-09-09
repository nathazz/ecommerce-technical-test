import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { CART_COOKIE, COOKIE_MAX_AGE_MS } from "../utils/constant";

export function resolveCartId(req: Request, res: Response): string {
  const existingCartId = req.signedCookies?.[CART_COOKIE];

  if (existingCartId) {
    return existingCartId;
  }

  const newCartId = uuid();

  res.cookie(CART_COOKIE, newCartId, {
    httpOnly: true,

    signed: true,

    sameSite: "lax",

    secure: process.env.NODE_ENV === "production",

    maxAge: COOKIE_MAX_AGE_MS,

    path: "/",
  });

  return newCartId;
}
