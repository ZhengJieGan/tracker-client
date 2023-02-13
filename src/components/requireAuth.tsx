import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import { selectUserId } from "../redux/slices/users/userSlice";
import * as API from "../api/index";

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


  if (!localId) {
    return <Navigate to="/login" state={location.pathname} replace={true} />;
  }

  return props.children;
}

export default RequiredAuth;
