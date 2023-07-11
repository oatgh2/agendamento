import { useDispatch, useSelector } from "react-redux";
import SessionState from "./models/sessionModel";
import Login from "./views/account/login";
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Home from "./views/home/index";
import { useEffect } from 'react'




const App = () => {

    function ProtectedRoute(props: any) {
        const navigate = useNavigate();
        const temSessao = isLogged;

        const { children, error } = props

        useEffect(() => {
            if (!temSessao) {
                navigate('/login');
            }
        }, [temSessao, navigate])

        if (!temSessao)
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
                </Routes>
            </Router>
        </div>
    )

}


export default App;