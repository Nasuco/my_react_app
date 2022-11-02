import * as React from 'react';
import { useState, useEffect } from 'react';
import { doLoginWithGoogle } from 'react-google-login';
import { GoogleLogin } from 'react-google-login';

async function doLogin(email, password) {
    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    return data.token;
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState('');
    const [flag, setFlag] = useState(false);
    const token = localStorage.getItem('token');

    // console.log(email, password);
    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    const handleSubmit = (e) => {
        if(!email || !password) {
            setFlag(true);
        }else {
            setIsLoading(true);
            e.preventDefault();
            doLogin({email, password})
                .then((token) => localStorage.setItem('token', token))
                .catch((err) => console.log(err.message))
                .finally(() => setIsLoading(false));
        }
    };


    const haldleSuccessGoogle = (response) => {
        console.log(response);
        console.log(response.tokenId);
        if(response.tokenId)
        {doLoginWithGoogle(response.tokenId).then((token) => {
            localStorage.setItem("token", token);
            setIsLoggedIn(token);}).catch((err) => console.log(err.message)).finally(() => setIsLoading(false));}}

    // console.log(email, password, token);

    const haldleFailureGoogle = (response) => {
        console.log(response);
        alert(response);
    }

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className ="row g-0 justify-content-center">
                    <div className="col-lg-8 wOw fadInUp" data-wOw-delay="0.1s">
                        <form onSubmit={handleSubmit}>
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
                                <GoogleLogin
                                        clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        buttonText = "Login with Google"
                                        onSuccess = {haldleSuccessGoogle}
                                        onFailure = {haldleFailureGoogle}
                                        cookiePolicy = {'single_host_origin'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;