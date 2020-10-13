import { Position, Toaster } from "@blueprintjs/core";
import { RequestError } from "resources/apis/api";

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
});

export const toastError = (err: RequestError) => {
  const message = err.message;
  const intent = "danger";
  AppToaster.show({ message, intent });
};
