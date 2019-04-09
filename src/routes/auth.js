import React from 'react'
import { Switch, Route } from 'react-router'

import PageAuthRegister from 'components/auth/Register'
import PageAuthResetPassword from 'components/auth/ResetPassword'

const AdminPages = () => {
	return (
		<Switch>
			<Route exact path="/auth/register" component={PageAuthRegister} />
			<Route path="/auth/reset_password" component={PageAuthResetPassword} />
		</Switch>
	)
}

export default AdminPages
