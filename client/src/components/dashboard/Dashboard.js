import React, { Fragment } from 'react'
import {Redirect, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Dashboard = ({ auth }) => {
    return (
        <section className='container'>
            <div className='dashboard'>
            {<Fragment>{ auth.isAuthenticated && auth.loading === false && auth.user 
            ?
            <div className='dash'>
                <h1><strong>Welcome {auth.user.name}</strong></h1>
                <h4>Create and Add Todos here</h4>
                <Link className='btn btn-primary' to="/todo">My Todos</Link>
            </div>
            : 
            <Redirect to='/login' /> }</Fragment>}
        </div>
        </section>
        
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Dashboard);