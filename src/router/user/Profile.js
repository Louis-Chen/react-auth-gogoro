import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { Container, Segment } from 'semantic-ui-react'

import { withFirebase, withFirestore } from 'react-redux-firebase'

import { toast } from 'react-toastify'

import UserProfile from 'components/user/Profile'
import UserPhone from '../../components/user/Phone';
const PageUserProfile = props => {
	const { displayName, email, phoneNumber, emailVerified } = props.auth
	useEffect(() => {
		return () => {
			document.title = '使用者資料'
		}
	}, [])

	const initialValue = {
		email,
		displayName,
		phoneNumber
	}
	return (
		<Container style={{ marginTop: '20vh' }}>
			<Segment>
				<UserProfile initialValue={initialValue} isVerify={emailVerified} />
			</Segment>
			<UserPhone/>
		</Container>
	)
}

const mapStateToProps = state => ({
	auth: state.firebase.auth
})
const enhancer = compose(
	withFirebase,
	withFirestore,
	connect(mapStateToProps),
	withHandlers({
		updateProfile: ({ firestore, auth }) => values => {
			firestore.update(`user/${auth.uid}`, values).then(() => toast.success('成功'))
		}
	})
)

export default enhancer(PageUserProfile)
