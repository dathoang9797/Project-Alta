import { IRouter } from "@routers/interface"

export const routerPageError:IRouter = {
  path: "*",
  loader: import("@view/PageError"),
};