import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import { selectUserId } from "../redux/slices/users/userSlice";

function getItem(key: string): any {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item || "");
  } catch {
    return item;
  }
}

function RequiredAuth(props: any) {
  const localId = getItem("profile");
  const location = useLocation();
  const serverId = useAppSelector(selectUserId);

  const [valid, setValid] = useState<boolean>(true);

  setTimeout(function () {
    if (serverId !== localId) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, 2500);

  if (valid === false) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={location.pathname} replace={true} />;
  }

  return props.children;
}

export default RequiredAuth;
