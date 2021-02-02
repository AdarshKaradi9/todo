import React, { Fragment, useState } from 'react'
import {Link, Redirect} from 'react-router-dom';
import { register } from '../../action/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';

const Register = ({ register, isAuthenticated, setAlert }) => {
    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        if( password !== confirmPassword ) {
            setAlert("Password must be same", 'danger')
        } else {
            console.log(name,email, password)
            register({ name, email, password });
        }
    }
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    
    return (
        <Fragment>
            <div className='login'>
                <section className="container w-50 login-inner shadow p-3 mb-5 bg-white rounded">
                    <h1><strong>Register</strong></h1>
                    <p>Create an account</p>
                    <form className="form" onSubmit={ e => onSubmit(e) }>
                        <div className="form-group">
                            <input type="text" placeholder="Name" name="name" value={name} onChange={ e => onChange(e)}   />
                        </div>
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
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={ e => { onChange(e) }}
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                    <p className="my-1">
                        Don't have an account? <Link to="/login">Login</Link>
                    </p>
            </section>
            </div>
            
    </Fragment>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, setAlert })(Register)
