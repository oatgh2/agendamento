import { clearSessionData } from "../../redux/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useState } from "react"; 
import { clearRouteData } from "../../redux/routerSlice";



const HomeIndex = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(clearRouteData())
    dispatch(clearSessionData())
  }

  return (
    <button onClick={signOut}>Deslogar</button>
  );
}

export default HomeIndex;