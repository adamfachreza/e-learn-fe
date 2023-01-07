import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import App from './App';
import Login from './components/login';

const Middleware = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/login-admin" element={<Login/>}/>
            </Routes>
        </Router>
    )
}

export default Middleware;