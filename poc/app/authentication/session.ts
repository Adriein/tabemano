import { redirect } from "@remix-run/node";

export const requireUserSession = (request: Request) => {
  const cookie = request.headers.get("set-cookie");
  console.log(cookie);
  if (!cookie) {
    return redirect('/');
  }
}
