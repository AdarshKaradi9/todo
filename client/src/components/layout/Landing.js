import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <section className='landing'>
            <div className='landing-inner'>
                <h1><strong>Todo</strong></h1>
                <p>Let's you create, add and remove todos</p>
                <div>
                    <Link to="/register"><Button>Sign up</Button></Link>{' '}
                    <Link to="/login"><Button>Login</Button></Link>
                </div>
            </div>
        </section>
    )
}

Landing.prototype = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps)(Landing)