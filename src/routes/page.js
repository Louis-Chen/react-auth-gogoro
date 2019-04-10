import React from 'react'
import { Switch, Route } from 'react-router'

import RouterAuth from './auth'
import PageUserProfile from 'router/user/Profile'

import PageSignIn from 'router/sign/Login'

const RouterPages = () => {
	return (
		<Switch>
			<Route exact path="/" component={PageSignIn} />
			<Route path="/user/profile" component={PageUserProfile} />
			<Route path="/auth" component={RouterAuth} />
		</Switch>
	)
}

export default RouterPages
