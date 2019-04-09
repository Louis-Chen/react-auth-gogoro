import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'

const Nav = props => {
	return (
		<Menu size="huge">
			<Menu.Menu position="right">
				<Menu.Item>
					<Button primary as={Link} to="auth/register" content="註冊" size="big">
						註冊
					</Button>
				</Menu.Item>

				<Menu.Item>
					<Button as={Link} to="/" size="big" content="登入" />
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	)
}

export default Nav
