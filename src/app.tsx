import { useDispatch, useSelector } from "react-redux";
import SessionState from "./models/sessionModel";
import Login from "./views/account/login";

const App = () => {
    const dispatch = useDispatch();
    const sessionData = useSelector((state: SessionState) => state);
    const isLogged = !!sessionData.jwt && sessionData.timeExpires > new Date()
    return (
        <div className="App">
            {!isLogged ? <Login />: <Login />}
        </div>
    )

}


export default App;