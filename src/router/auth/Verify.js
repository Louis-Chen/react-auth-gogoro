import React from 'react'
import queryString from 'query-string'

import VerifyEmail from 'components/auth/VerifyEmail'
import ConfirmNewPassword from 'components/auth/ConfirmNewPassword'
import { Container, Segment } from 'semantic-ui-react';

// http://localhost:3000/action?mode=resetPassword&oobCode=ABC123&apiKey=AIzaSy

// mode - The user management action to be completed
// oobCode - A one-time code, used to identify and verify a request
// apiKey - Your Firebase project's API key, provided for convenience

const PageAuthVerifyAction = props => {
	const query = queryString.parse(props.location.search)
	// Get the action to complete.
	const mode = query.mode

	// Get the one-time code from the query parameter.
	const actionCode = query.oobCode

	// (Optional) Get the API key from the query parameter.
	// const apiKey = props.location.query.apiKey;

	// Handle the user management action.
	switch (mode) {
		// case 'recoverEmail':
		// 	// Display reset password handler and UI.
		// 	return <RecoverEmail actionCode={actionCode} />
		case 'resetPassword':
			// Display email recovery handler and UI.
			return (
				<Container style={{ marginTop: '20vh' }}>
					<Segment>
						<ConfirmNewPassword actionCode={actionCode} />
					</Segment>
				</Container>
			)
		case 'verifyEmail':
			// Display email verification handler and UI.
			return (
				<Container style={{ marginTop: '20vh' }}>
					<Segment>
						<VerifyEmail actionCode={actionCode} />
					</Segment>
				</Container>
			)
		default:
			// Error: invalid mode.
			return (
				<Container style={{ marginTop: '20vh' }}>
					<Segment>
						<div className="Action">
							<h1>Error 錯誤</h1>
							<p>無效網址</p>
						</div>
					</Segment>
				</Container>
			)
	}
}

export default PageAuthVerifyAction
