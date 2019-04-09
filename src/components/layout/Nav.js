import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Menu, Dropdown } from 'semantic-ui-react'

import { compose, withHandlers } from 'recompose'
import { withFirebase, isEmpty } from 'react-redux-firebase'

const MenuAuth = props => {
	const {
		profile: { email },
		userLoginout
	} = props
	return (
		<React.Fragment>
			<Dropdown item text={email}>
				<Dropdown.Menu>
					<Dropdown.Item>會員資料</Dropdown.Item>
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
				<Button primary as={Link} to="auth/register" content="註冊" size="big">
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
	const { profile, userLoginout } = props
	const isAuthed = isEmpty(profile) ? <MenuDefault /> : <MenuAuth profile={profile} userLoginout={userLoginout} />

	return (
		<Menu size="huge">
			<Menu.Menu position="right">{isAuthed}</Menu.Menu>
		</Menu>
	)
}

const mapStateToProps = state => ({
	profile: state.firebase.profile
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
