import { clearSessionData } from "../../redux/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useState } from "react"; 
import { clearRouteData } from "../../redux/routerSlice";
import { useNavigate } from "react-router-dom";



const HomeIndex = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const signOut = () => {
    dispatch(clearRouteData())
    dispatch(clearSessionData())
    navigate('/login')
  }

  return (
    <button onClick={signOut}>Deslogar</button>
  );
}

export default HomeIndex;