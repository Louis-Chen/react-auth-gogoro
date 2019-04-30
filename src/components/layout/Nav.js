import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Menu, Dropdown } from 'semantic-ui-react'

import { compose, withHandlers } from 'recompose'
import { withFirebase, isEmpty } from 'react-redux-firebase'

const MenuAuth = props => {
	const {
		auth: { email },
		userLoginout
	} = props
	return (
		<React.Fragment>
			<Menu.Item>
				<Button primary as={Link} to="/gogoro" content="註冊" size="big">
					Gogoro 充電站地圖
				</Button>
			</Menu.Item>
			<Dropdown item text={email}>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to='/user/profile'>會員資料</Dropdown.Item>
					<Dropdown.Item onClick={userLoginout}>登出</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</React.Fragment>
	)
}
const MenuDefault = props => {
	return (
		<React.Fragment>
			<Menu.Item>
				<Button primary as={Link} to="/auth/register" content="註冊" size="big">
					註冊
				</Button>
			</Menu.Item>

			<Menu.Item>
				<Button as={Link} to="/" size="big" content="登入" />
			</Menu.Item>
		</React.Fragment>
	)
}
const Nav = props => {
	const { auth, userLoginout } = props
	const isAuthed = isEmpty(auth) ? <MenuDefault /> : <MenuAuth auth={auth} userLoginout={userLoginout} />

	return (
		<Menu size="huge">

			<Menu.Menu position="right">{isAuthed}</Menu.Menu>
		</Menu>
	)
}

const mapStateToProps = state => ({
	auth: state.firebase.auth
})

const enhancer = compose(
	withFirebase,
	withHandlers({
		userLoginout: ({ firebase }) => () => {
			firebase.logout()
		}
	}),
	connect(mapStateToProps)
)
export default enhancer(Nav)
