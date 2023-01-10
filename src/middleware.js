import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import App from './App';
import ListUser from "./components/ListUser";
import ListVideoAdmin from "./components/ListVideoAdmin";
import Login from './components/login';

const Middleware = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/login-admin" element={<Login/>}/>
                <Route path="/list-video-admin" element={<ListVideoAdmin/>}/>
                <Route path="/list-user" element={<ListUser/>}/>
            </Routes>
        </Router>
    )
}

export default Middleware;