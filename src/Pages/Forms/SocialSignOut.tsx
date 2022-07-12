import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { toast } from "react-toastify";

import { signOut } from "store/reducers/authReducer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

function SocialSignOut() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(signOut());
    toast.success("See You Again"!!!, {
      theme: "colored",
    });
    navigate("/");
  };
  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
      buttonText="Sign Out"
      onLogoutSuccess={logout}
    />
  );
}

export default SocialSignOut;
