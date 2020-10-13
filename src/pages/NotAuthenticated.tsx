import React from "react";

export const NotAuthenticated = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      Bạn chưa được chứng thực. Vui lòng <a href="/">Đăng nhập tại đây</a>
    </div>
  );
};
