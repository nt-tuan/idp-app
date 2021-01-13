import React from "react";

export const LogoutCallback = () => {
  const [countdown, setCountdown] = React.useState<number>(2);

  const setTimer = React.useCallback(
    (redirect_uri: string) => {
      setTimeout(() => {
        if (countdown <= 1) {
          window.location.href = redirect_uri;
          return;
        }
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    },
    [countdown]
  );

  React.useEffect(() => {
    var redirect_uri = "/";
    setTimer(redirect_uri);
  }, [setTimer]);

  return (
    <div>
      Bạn đã đăng xuất thành công :), chuyển hướng đến trang chủ trong{" "}
      {countdown}
    </div>
  );
};
