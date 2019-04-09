import React from 'react'
import { Container } from 'semantic-ui-react'

import SignLogin from 'components/sign/Login'

const PageSignIn = props => {
	return (
		<Container style={{ marginTop: '10vh' }}>
			<SignLogin />
		</Container>
	)
}

export default PageSignIn
