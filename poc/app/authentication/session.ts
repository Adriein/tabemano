import { redirect } from "@remix-run/node";

export const requireUserSession = (request: Request) => {
  const cookie = request.headers.get("set-cookie");
  console.log(cookie);
  if (!cookie) {
    return redirect('/');
  }
};

export const decryptBase64 = (encrypted: string): string => {
  return Buffer.from(encrypted, 'base64').toString();
};

export const decryptJwtPayload = (encryptedJwt: string): any => {
  const token = decryptBase64(encryptedJwt);

  return JSON.parse(decryptBase64(token.split('.')[1]));
};

export const getJwtPayload = (request: Request) => {
  const cookie = request.headers.get("Cookie");

  const encryptedCookieValue = cookie!.replace('tabemano-session=', '');

  return decryptJwtPayload(encryptedCookieValue);
}
