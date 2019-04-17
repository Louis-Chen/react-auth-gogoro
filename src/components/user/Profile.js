import React, { useState } from 'react'
import { Form, Button, Header, Divider, Label, Message } from 'semantic-ui-react'
import { Form as Formik, withFormik, Field, ErrorMessage } from 'formik'
import { compose, withHandlers, withState } from 'recompose'

import { Field as Input } from '../field'
import * as yup from 'yup'
import { withFirebase, withFirestore } from 'react-redux-firebase'

const UserProfile = props => {
	const {
		isVerify,
		signInPhone,
		message,
		setVerifyCode,
		verifyCode,
		confirmCode,
		confirmResult,
		firebase,
		unlinkPhoneProvider
	} = props
	const [phone, setPhone] = useState('')
	console.log(firebase.auth().currentUser)
	return (
		<Form>
			<Header as="h1" content="使用者資料" />
			<Divider />
			<Formik>
				<Form.Field>
					<label>使用者名稱：</label>
					<Field name="displayName" type="text" placeholder="名稱" component={Input.Text} />
					<ErrorMessage name="displayName" />
				</Form.Field>
				<Form.Field>
					<label>
						信箱： <Label color={isVerify ? 'green' : 'red'} content={isVerify ? '已驗證' : '未驗證'} />
					</label>
					<Field name="email" type="email" placeholder="帳號(信箱)" component={Input.Text} />
					<ErrorMessage name="email" />
				</Form.Field>

				<Form.Field>
					<label>手機號碼</label>
					<Field name="phoneNumber" setPhone={setPhone} component={Input.Phone} />
				</Form.Field>

				<Form.Field>
					<Button type="button" onClick={() => signInPhone(phone)} content="送出驗證碼" />
				</Form.Field>

				<Form.Field>
					<Button type="button" onClick={() => unlinkPhoneProvider()} negative content="移除手機連結" />
				</Form.Field>

				<Form.Field>
					<div id="recaptcha-container" />
				</Form.Field>

				{confirmResult && (
					<Form.Field>
						<label>驗證碼</label>
						<Form.Input onChange={e => setVerifyCode(e.target.value)} name="verifyCode" value={verifyCode} />
						<Button type="button" onClick={() => confirmCode()} content="驗證手機" />
						<Message hidden={message === ''} content={message} />
					</Form.Field>
				)}

				<Button type="submit" fluid content="修改" />
			</Formik>
		</Form>
	)
}

UserProfile.defaultValues = {
	isVerify: false
}

const enhancer = compose(
	withFirebase,
	withFirestore,
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
				.catch(error => setMessage(`登入手機號碼出現錯誤: ${error.message}`))
		},
		confirmCode: ({ confirmResult, verifyCode, setMessage, setConfirmResult, firebase }) => e => {
			if (confirmResult && verifyCode.length) {
				const credential = firebase.auth.PhoneAuthProvider.credential(confirmResult.verificationId, verifyCode)
				firebase
					.auth()
					.currentUser.linkAndRetrieveDataWithCredential(credential)
					.then(user => {
						setMessage('驗證成功')
						setConfirmResult('')
					})
					.catch(error => setMessage(`驗證錯誤: ${error.message}`))
			}
		},
		unlinkPhoneProvider: ({ firebase }) => () => {
			firebase.auth().currentUser.unlink(firebase.auth.PhoneAuthProvider.PROVIDER_ID)
		}
	}),
	withFormik({
		mapPropsToValues: props => {
			return { ...props.initialValue }
		},
		// Custom sync validation

		validationSchema: () =>
			yup.object().shape({
				email: yup
					.string()
					.email('不符合信箱格式')
					.required('必填'),
				displayName: yup.string().required('必填'),
				phoneNumber: yup.string()
			}),
		handleSubmit: (values, { setSubmitting }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2))
				setSubmitting(false)
			}, 1000)
		},
		enableReinitialize: true,
		displayName: 'UserProfile'
	})
)

export default enhancer(UserProfile)
