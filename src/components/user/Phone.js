import React, { useState } from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import { withFirebase } from 'react-redux-firebase'

const UserPhone = props => {
	const { signInPhone, message, setVerifyCode, verifyCode, confirmCode } = props
	const [phone, setPhone] = useState('')
	return (
		<Form>
			<Form.Field>
				<label>手機號碼</label>
				<Input name="phone" value={phone} onChange={(e, { name, value }) => setPhone(value)} />
				<Button type="button" onClick={() => signInPhone(phone)} content="送出驗證碼" />
				<div id="recaptcha-container" />
			</Form.Field>
			<Form.Field>
				<label>驗證碼</label>
				<input onChange={e => setVerifyCode(e.target.value)} name="verifyCode" value={verifyCode} />
				<Button type="button" onClick={() => confirmCode()} content="驗證手機" />
			</Form.Field>
			<Message content={message} />
		</Form>
	)
}
const enhancer = compose(
	withFirebase,
	withState('message', 'setMessage', ''),
	withState('confirmResult', 'setConfirmResult', null),
	withState('verifyCode', 'setVerifyCode', ''),
	withHandlers({
		signInPhone: ({ firebase, setMessage, setConfirmResult }) => phone => {
			console.log(phone)
			const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
			firebase.auth().useDeviceLanguage()
			firebase
				.auth()
				.signInWithPhoneNumber(phone, appVerifier)
				.then(confirmResult => {
					console.log(confirmResult)
					setConfirmResult(confirmResult)
				})
				.then(() => setMessage('成功送出驗證'))
				.catch(error => setMessage(`Sign In With Phone Number Error: ${error.message}`))
		},
		confirmCode: ({ confirmResult, verifyCode, setMessage, firebase }) => e => {
			if (confirmResult && verifyCode.length) {
				const credential = firebase.auth.PhoneAuthProvider.credential(confirmResult.verificationId, verifyCode)
				firebase
					.auth()
					.currentUser.linkAndRetrieveDataWithCredential(credential)
					.then(user => {
						setMessage('Code Confirmed!')
					})
					.catch(error => setMessage(`Code Confirm Error: ${error.message}`))
			}
		}
	})
)
export default enhancer(UserPhone)
