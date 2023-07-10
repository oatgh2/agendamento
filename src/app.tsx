import { useDispatch, useSelector } from "react-redux";
import SessionState from "./models/sessionModel";
import Login from "./views/account/login";
import { clearSessionData } from "./redux/sessionSlice";




const App = () => {
    const dispatch = useDispatch();
    const signOut = () => {
        dispatch(clearSessionData())
    }
    const sessionData: SessionState = useSelector((state: any) => state.session);
    const dataExpires = new Date(sessionData.timeExpires)
    const isLogged = !!sessionData.jwt && dataExpires.getTime() > new Date().getTime()
    return (
        <div className="App">
            {!isLogged ? <Login /> : <button onClick={signOut}>Deslogar</button>}
        </div>
    )

}


export default App;