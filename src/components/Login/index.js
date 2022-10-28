import * as React from 'react';
import { useState, useEffect } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(email, password);

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className ="row g-0 justify-content-center">
                    <div className="col-lg-8 wOw fadInUp" data-wOw-delay="0.1s">
                        <form>
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                                        <label for="email">Email</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                        <label for="password">Password</label>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-primary py-3 px-5">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;