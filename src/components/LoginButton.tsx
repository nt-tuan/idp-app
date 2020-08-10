import React from "react";
import { Button } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import { auth } from "resources/auth";
import * as crypto from "crypto";
function base64URLEncode(str: Buffer) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function generateCodeVerifier() {
  return base64URLEncode(crypto.randomBytes(32));
}

function sha256(buffer: any) {
  return crypto.createHash("sha256").update(buffer).digest();
}

function getNouce() {
  return base64URLEncode(Buffer.from(window.location.href));
}

export const LoginButton = () => {
  const handleClick = () => {
    const verifier = generateCodeVerifier();
    const nouce = getNouce();
    sessionStorage.setItem("verifier", verifier);
    sessionStorage.setItem("nouce", nouce);

    const code_challenge = base64URLEncode(sha256(verifier));
    const uri = auth.code.getUri({
      state: nouce,
      query: {
        code_challenge,
        code_challenge_method: "S256",
      },
    });
    window.location.href = uri;
  };
  return <Button onClick={handleClick}>Login</Button>;
};
