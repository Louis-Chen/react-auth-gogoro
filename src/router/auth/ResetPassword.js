import React, { useEffect } from 'react'

import { Container, Segment } from 'semantic-ui-react'

import ResetPassword from 'components/auth/ResetPassword'

const PageAuthResetPassword = props => {
	useEffect(() => {
		return () => {
			document.title = '登入'
		}
	}, [])
	return (
		<Container style={{ marginTop: '20vh' }}>
			<Segment>
				<ResetPassword />
			</Segment>
		</Container>
	)
}

export default PageAuthResetPassword
