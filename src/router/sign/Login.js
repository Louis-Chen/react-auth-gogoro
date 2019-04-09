import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Divider, Button } from 'semantic-ui-react'

import SignLogin from 'components/sign/Login'

const PageSignIn = props => {
	useEffect(() => {
		return () => {
			document.title = '登入'
		}
	}, [])
	return (
		<Container style={{ marginTop: '20vh' }}>
			<Segment>
				<SignLogin />
			</Segment>
			<Divider horizontal>Or</Divider>
			<Segment basic textAlign="center">
				<Button as={Link} to="auth/register" basic content="忘記密碼" size="big" />
				<Button size="big" basic icon="google" content="Google 註冊" />
			</Segment>
		</Container>
	)
}

export default PageSignIn
