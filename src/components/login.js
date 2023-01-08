import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"; 

const Login = () =>{
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const login = localStorage.getItem('dataLoginAdmin');
        if(login > 0){
            navigate('/list-video-admin');
        }else{
            navigate('/login-admin');
        }    
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataSend = {
            email,
            password
        }
        if(email === '' || password === ''){
            Swal("failed","login Gagal","error");
        }else{
            fetch(`${process.env.REACT_APP_API}/loginAdmin`,{
                method:'POST',
                body: JSON.stringify(dataSend),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(hasil => {
                console.log(hasil);
                localStorage.setItem('dataLoginAdmin',hasil.token);
               navigate('/list-video-admin');
            })
            .catch(err =>{
                alert(err)
            })
            
        }
    }

    return(
        <>
        <div className="container image-bg">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Login Admin</h3>
                        <div className="d-flex justify-content-end social-icon">
                            <span>
                                <i className="fab fa-facebook-square"></i>
                            </span>
                            <span>
                                <i className="fab fa-twitter-square"></i>
                            </span><span>
                                <i className="fab fa-google-plus-square"></i>
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="email"/>
                            </div>

                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="password"/>
                            </div>

                            <div className="form-group">
                                <button onClick={(e) => handleSubmit(e)} className="btn float-right login-btn">Login</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;