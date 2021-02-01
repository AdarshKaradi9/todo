import React, { Fragment, useState } from 'react'
import {Link, Redirect} from 'react-router-dom';
import { login } from '../../action/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData ] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        login({ email, password })
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    
    return (
        <Fragment>
            <div className='login'>
                <section className="container w-50 login-inner shadow p-3 mb-5 bg-white rounded">
                    <h1><strong>Sign In</strong></h1>
                    <p>Sign Into Your Account</p>
                    <form className="form" onSubmit={ e => onSubmit(e) }>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" value={email} onChange={ e => onChange(e)} name="email"/>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={ e => { onChange(e) }}
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </form>
                    <p className="my-1">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </section>
            </div>
            
    </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
