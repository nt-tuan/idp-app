import { Icon } from "@blueprintjs/core";
import React from "react";
import { RequestError } from "resources/apis/api";

export const ErrorMessage = (props: RequestError) => {
  const messages: string[] = React.useMemo(() => {
    if (props.messages && props.messages.length > 0) {
      return props.messages;
    }
    if (props.message.length > 0) return [props.message];
    return ["Oops, đã có lỗi xãy ra nên bạn hãy tải lại trang nhé!"];
  }, [props]);
  return (
    <div className="text-red-100 bg-red-500 flex flex-col">
      {messages.map((message) => (
        <div>
          <Icon icon="error" /> {message}
        </div>
      ))}
    </div>
  );
};
