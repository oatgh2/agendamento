import { useDispatch, useSelector } from "react-redux";
import SessionState from "./models/sessionModel";
import Login from "./views/account/login";
import Route from "./models/routerModel";
import HomeIndex from './views/home/index'



const App = () => {
    const dispatch = useDispatch();
    
    const sessionData: SessionState = useSelector((state: any) => state.session);
    const routeData: Route = useSelector((state: any) => state.route)
    const dataExpires = new Date(sessionData.timeExpires)
    const isLogged = !!sessionData.jwt && dataExpires.getTime() > new Date().getTime()
    const actualRoute = routeData.actualRoute;
    const route = () => {
        if(isLogged){
           if(actualRoute === 'home/index')
            return HomeIndex();
        }else{
            if(actualRoute === 'account/register'){
                
            }else{
                return Login();
            }
        }
    }
    return (
        <div className="App">
            {route()}
        </div>
    )

}


export default App;