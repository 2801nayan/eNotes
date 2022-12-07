import React, { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [sCredentials, setsCredentials] = useState({ name: "", email: "", password: "", cPassword: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: sCredentials.name, email: sCredentials.email, password: sCredentials.password, cPassword: sCredentials.cPassword })
    });
    const json = await response.json();
  
    if (json.success) {
      //save the auth token and redirect to home page
      localStorage.setItem('token', json.authToken)
      props.showAlert("Account Created Successfully", "success ")
      navigate("/")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  const onChange = (e) => {
    setsCredentials({ ...sCredentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-4" >
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">eNotes - Sign up</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="name" name="name" required value={sCredentials.name} onChange={onChange} placeholder='Enter your name' className="form-control" />
                            {/* <label className="form-label" htmlFor="form3Example1c">Your Name</label> */}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="email" name="email" required value={sCredentials.email} onChange={onChange} placeholder='Enter your e-mail' className="form-control" />
                            {/* <label className="form-label" htmlFor="form3Example3c">Your Email</label> */}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="password" required name="password" value={sCredentials.password} onChange={onChange} placeholder='Enter your password' minLength={8} className="form-control" />
                            {/* <label className="form-label" htmlFor="form3Example4c">Password</label> */}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="cPassword" required name="cPassword" onChange={onChange} placeholder='Re-enter your password' className="form-control" minLength={8} value={sCredentials.cPassword}/>
                            {/* <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label> */}
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                          <label className="form-check-label" htmlFor="form2Example3">
                            <b className='text-muted'>Remember My Login Info.</b>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" disabled={sCredentials.email.length === 0 || sCredentials.password.length === 0} className="btn btn-primary btn-lg">Sign up</button>
                        </div>
                        <div className="text-center">
                          <p>or sign up with:</p>
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
                        className="img-fluid" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup