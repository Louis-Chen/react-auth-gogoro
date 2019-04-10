import React from 'react'
import { Switch, Route } from 'react-router'

import PageAuthRegister from 'router/auth/Register'
import PageAuthVerifyAction from 'router/auth/Verify'
import PageAuthResetPassword from 'router/auth/ResetPassword'

const AdminPages = () => {
	return (
		<Switch>
			<Route exact path="/auth/register" component={PageAuthRegister} />
			<Route path="/auth/reset" component={PageAuthResetPassword} />
			<Route path="/auth/verify" component={PageAuthVerifyAction} />
		</Switch>
	)
}

export default AdminPages
