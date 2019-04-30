import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Divider, Button } from 'semantic-ui-react'

import SignLogin from 'components/sign/Login'
import { compose, withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'

const PageSignIn = props => {
	const { googloLogin, emailLogin } = props
	useEffect(() => {
		return () => {
			document.title = '登入'
		}
	}, [])
	return (
		<Container style={{ marginTop: '20vh' }}>
			<Segment>
				<SignLogin emailLogin={emailLogin} />
			</Segment>
			<Divider horizontal>Or</Divider>
			<Segment basic textAlign="center">
				<Button as={Link} to="auth/reset" basic content="忘記密碼" size="big" />
				<Button size="big" basic icon="google" content="Google 註冊" onClick={googloLogin} />
			</Segment>
		</Container>
	)
}

const enhancer = compose(
	withFirebase,
	withHandlers({
		googloLogin: ({ firebase }) => values => {
			firebase.login({
				provider: 'google',
				type: 'popup'
			})
		},
		emailLogin: ({ firebase }) => values => {
			firebase.login({
				email: values.email,
				password: values.password
			})
		}
	})
)

export default enhancer(PageSignIn)
