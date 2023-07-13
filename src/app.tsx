import { useDispatch, useSelector } from "react-redux";
import SessionState from "./models/sessionModel";
import Login from "./views/account/login";
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Home from "./views/home/index";
import { useEffect } from 'react'
import Register from "./views/account/register";




const App = () => {

    function ProtectedRoute(props: any) {
        const navigate = useNavigate();
        const hasSession = isLogged;

        const { children, error } = props

        useEffect(() => {
            if (!hasSession) {
                navigate('/login');
            }
        }, [hasSession, navigate])

        if (!hasSession)
            return null
        //Global
        return (
            <div>
                <span>{error}</span>
                {children}
            </div>
        );
    }


    const sessionData: SessionState = useSelector((state: any) => state.session);
    const dataExpires = new Date(sessionData.timeExpires)
    const isLogged = !!sessionData.jwt && dataExpires.getTime() > new Date().getTime()

    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Homes */}
                    <Route path="/home/index" element=
                        {
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                    <Route path="/home" element=
                        {
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                    <Route path="*" element=
                        {
                            <ProtectedRoute error={"Caminho não econtrado"}>
                                <Home />
                            </ProtectedRoute>
                        } />
                    <Route path="/" element=
                        {
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                    <Route path="/home" element=
                        {
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                    <Route path="*" element=
                        {
                            <ProtectedRoute error={"Caminho não econtrado"}>
                                <Home />
                            </ProtectedRoute>
                        } />
                    {/* Outras rotas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/login/:msg" element={<Login />} />
                    <Route path="/login/:type/:msg" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    )

}


export default App;