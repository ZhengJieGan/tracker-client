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
    console.log(valid)
    if (serverId !== localId) {
    
      setValid(false);
    } else {
      setValid(true);
    }
  }, 2000);

  if (valid === false) {
    return <Navigate to="/login" state={location.pathname} replace={true} />;
  } else {

  }

  return props.children;
}

export default RequiredAuth;
