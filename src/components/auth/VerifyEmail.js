import React from 'react'
// import { Link } from 'react-router-dom'
import { compose, withHandlers, withState } from 'recompose'
import { withFirebase } from 'react-redux-firebase'

import { Loader, Message } from 'semantic-ui-react'

const VerifyEmailSuccess = () => {
	return (
		<Message positive>
			<Message.Header>信箱驗證成功</Message.Header>
			<p>點擊跳轉...</p>
		</Message>
	)
}

const VerifyEmailFail = () => {
	return (
		<Message negative>
			<Message.Header>信箱驗證失敗</Message.Header>
			<p>點擊返回會員資料...</p>
		</Message>
	)
}

const VerifyEmail = ({ validCode, verifiedCode }) => {
	let component
	if (!verifiedCode) {
		component = (
			// loading 頁面
			<div className="auth-container" style={{ position: 'relative' }}>
				<div className="reset-loading">
					<Loader active inline="centered" size="massive">
						Loading
					</Loader>
				</div>
			</div>
		)
	} else if (verifiedCode && validCode) {
		component = VerifyEmailSuccess
	} else if (verifiedCode && !validCode) {
		component = VerifyEmailFail
	}

	return component
}

const enhancer = compose(
	withFirebase,
	withState('validCode', 'setValidCode', null),
	withState('verifiedCode', 'setVerifiedCode', false),
	withHandlers({
		checkVerify: ({ firebase, actionCode, setValidCode, setVerifiedCode }) => () => {
			firebase
				.auth()
				.applyActionCode(actionCode)
				.then(() => {
					setValidCode(true)
					setVerifiedCode(true)
				})
				.catch(err => {
					setValidCode(false)
					setVerifiedCode(true)
				})
		}
	})
)

export default enhancer(VerifyEmail)
