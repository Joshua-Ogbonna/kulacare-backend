import crypto from "crypto";

export const generateUniqueCode = (): string => {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
};
