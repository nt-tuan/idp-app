import { NonIdealState } from "@blueprintjs/core";
import React from "react";

export const NotFound = () => {
  return (
    <NonIdealState
      icon="document"
      title="404"
      description="Không tìm thấy trang bạn đang tìm kiếm"
    />
  );
};
