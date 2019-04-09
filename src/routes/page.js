import React from 'react'
import { Switch, Route } from 'react-router'

import RouterAuth from './auth'
import RouterUser from './user'

import PageSignIn from 'router/sign/Login'

const RouterPages = () => {
	return (
		<Switch>
			<Route exact path="/" component={PageSignIn} />
			<Route component={RouterAuth} />
			<Route component={RouterUser} />
		</Switch>
	)
}

export default RouterPages
