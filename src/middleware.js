import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import LoginUser from "./components/AuthUser/LoginUser";
import ListVideoAdmin from "./components/ListVideoAdmin";
import Login from './components/login';
import ListAdmin from "./components/listAdmin";
import Register from "./components/AuthUser/Register";
import PageListVideoUser from "./components/PageListVideoUser/index";
import SoalQuiz from "./components/SoalQuiz/index";
import Skor from "./components/Skor/index";

const Middleware = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginUser />} />
                <Route path="/login-admin" element={<Login/>}/>
                <Route path="/list-video-admin" element={<ListVideoAdmin/>}/>
                <Route path="/list-admin" element={<ListAdmin/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/list-video-user" element={<PageListVideoUser/>} />
                <Route path="/quiz" element={<SoalQuiz />}/>
                <Route path="/skor" element={<Skor />}/>
            </Routes>
        </Router>
    )
}

export default Middleware;