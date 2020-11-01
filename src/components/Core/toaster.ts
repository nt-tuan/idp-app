import { Position, Toaster } from "@blueprintjs/core";
import { RequestError } from "resources/apis/api";
import {
  defaultErrorMessage,
  translateErrorMessages,
} from "resources/translation/errors";

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
});

export const toastError = (err: RequestError) => {
  const messages = translateErrorMessages(err.messages, defaultErrorMessage);
  const intent = "danger";
  messages.forEach((message) => AppToaster.show({ message, intent }));
};
export const toastSuccess = (message: React.ReactNode, timeout?: number) => {
  AppToaster.show({ message, intent: "success", timeout });
};
