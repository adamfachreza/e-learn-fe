const Login = () =>{
    const[email,setEmail] = useState
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
                                <input type="text" className="form-control" placeholder="username"/>
                            </div>

                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                <input type="password" className="form-control" placeholder="password"/>
                            </div>

                            <div className="form-group">
                                <button className="btn float-right login-btn">Login</button>
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