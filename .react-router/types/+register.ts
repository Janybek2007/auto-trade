import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/404": {};
  "/about": {};
  "/cars/:id": {
    "id": string;
  };
};