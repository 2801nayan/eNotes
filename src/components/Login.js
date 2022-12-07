import React, { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();

            if (json.success) {
                //save the auth token and redirect to home page
                localStorage.setItem('token', json.authToken)
                props.showAlert("Welcome,You Are Logged In", "success ")
                navigate("/")
            } else {
                props.showAlert("Invalid Credentials", "danger")
            }
        }
        catch (error) {
            console.log("error occurred while storing token : " + error.message)
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {/* <!-- Section: Design Block --> */}
            <div>
                <section className="vh-100">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black" style={{ borderRadius: "25px" }}>
                                    <div className="card-body p-md-4" >
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">eNotes - Log In</p>

                                                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="email" id="email" required name='email' onChange={onChange} value={credentials.email} placeholder='Enter your e-mail' className="form-control" />
                                                            {/* <label className="form-label" htmlFor="form3Example3c">Your Email</label> */}
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" id="password" required name='password' onChange={onChange} value={credentials.password} minLength={8} placeholder='Enter your password' className="form-control" />
                                                            {/* <label className="form-label" htmlFor="form3Example4c">Password</label> */}
                                                        </div>
                                                    </div>

                                                    <div className="form-check d-flex justify-content-center mb-5">
                                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                        <label className="form-check-label" htmlFor="form2Example3">
                                                            <b className='text-muted'>Remember My Login Info.</b>
                                                        </label>
                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="submit" disabled={credentials.email.length === 0 || credentials.password.length === 0} className="btn btn-primary btn-lg">Log In</button>
                                                    </div>
                                                    {/* <!-- Register buttons --> */}
                                                    <div className="text-center">
                                                        <p>or log in with </p>
                                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                                            <i className="fab fa-google"></i>
                                                        </button>

                                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                                            <i className="fab fa-github"></i>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                    className="img-fluid" alt='' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Login