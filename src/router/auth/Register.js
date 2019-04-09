import React, { useEffect } from 'react'

import { Container, Segment } from 'semantic-ui-react'

import AuthRegister from 'components/auth/Register'

const PageAuthRegister = props => {
	useEffect(() => {
		return () => {
			document.title = '登入'
		}
	}, [])
	return (
		<Container style={{ marginTop: '20vh' }}>
			<Segment>
				<AuthRegister />
			</Segment>
		</Container>
	)
}

export default PageAuthRegister
