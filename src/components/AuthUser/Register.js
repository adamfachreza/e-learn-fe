import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"; 

const Register= () => {
    const[nama,setNama] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[password_confirmation, setConfirmPassword] = useState('');
    const Swal = require("sweetalert2");
    // const navigate = useNavigate();
    

    // useEffect(()=>{
        // const login = localStorage.getItem('dataLoginPeserta');
        // if(login){
        //     navigate('/list-video-peserta');
        // }
    // },[])

    const handleSubmit = (e) => {
        
        e.preventDefault();
        const dataSend = {
            nama,
            email,
            password,
            password_confirmation
            // atau bisa di tulis begini
            // password_confirmation : konfirmasiPassword
        }
        if(nama === '' || email === '' || password === '' || password_confirmation === ''){
            Swal.fire("failed","login Gagal","error");
        }else{
            fetch(`${process.env.REACT_APP_API}/register`,{
                method:'POST',
                body: JSON.stringify(dataSend),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(hasil => {
                if(hasil.status === 'berhasil'){
                    console.log(hasil);
                    localStorage.setItem('dataLoginPeserta',hasil.token);
                    // navigate('/list-video-peserta');
                }
                
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
                        <h3>Login Peserta</h3>
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
                                <input onChange={(e) => setNama(e.target.value)} type="text" className="form-control" placeholder="Nama" value={nama}/>
                            </div>

                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="email" value={email}/>
                            </div>

                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="password" value={password}/>
                            </div>

                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="confirm password" value={password_confirmation}/>
                                {password !== password_confirmation && password.length > 0 || password_confirmation.length> 0? <span style={{color:'red',fontSize:13}}>password dan password konfirmasi harus sama</span>:''}
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

export default Register;