import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../action/auth'
const Navbar = ({ auth: { isAuthenticated, loading, user}, logout }) => {
    const onClick = async e => {
        e.preventDefault();
        logout()
        return <Redirect to='/' />
    }
    const authLinks = (
        <div>
            <Link className='link' to="/dashboard">Dashboard</Link>
            <a className='link' onClick={e => onClick(e)} href="#!">
                {' '}
            <span className="hide-sm">Logout</span></a>
        </div>
    )

    const guestLinks = (
        <div>
            <Link className='link' to="/">Home </Link>
            <Link className='link' to="/register">Register </Link>
            <Link className='link' to="/login">Login </Link>
        </div>
    )
    return (
        <nav className="navbar bg-dark">
            <h3>
                <Link className='link' to="/dashboard">Todo</Link>
            </h3>
            { (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
            
        </nav>
    )
}
Navbar.prototype = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)