import React, { useEffect } from 'react'
import { Form as Formik, withFormik, Field, ErrorMessage } from 'formik'

import { Field as Input } from '../field'
import * as yup from 'yup'
import { Button } from 'semantic-ui-react'

import { compose, withHandlers, withState } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { toast } from 'react-toastify'

const PhoneVerify = props => {
	const {
		firebase,
		setCaptchaRespone,
		showVerification,
		setVerificationCode,
		verificationCode,
		phoneNumber,
		setPhoneNumber,
		signInPhone
	} = props
	useEffect(() => {
		return () => {
			window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptcha, {
				size: 'normal',
				callback: response => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					// ...

					setCaptchaRespone(response)
				},
				'expired-callback': function() {
					// Response expired. Ask user to solve reCAPTCHA again.
					// ...
				}
			})
			window.recaptchaVerifier.render().then(function(widgetId) {
				window.recaptchaWidgetId = widgetId
			})
		}
	}, [])
	return (
		<Formik>
			{/* <Field name="phoneNumber" autoFocus={true} type="phone" placeholder="手機號碼" component={Input.Text} />
			<div id="recaptcha-container" />
			<ErrorMessage name="phoneNumber" /> */}
			<Button content="驗證" />
			{showVerification && (
				<React.Frament>
					<h2 style={{ textAlign: 'center' }}>Firebase Phone Auth</h2>
					<div ref={ref => (this.recaptcha = ref)} />
					<div className="input-group mb-3">
						<Input
							name="phoneNumber"
							onChange={(e, { value }) => setPhoneNumber(value)}
							type="text"
							value={phoneNumber}
							autoComplete="off"
							placeholder="Phone Number"
						/>
						<div className="input-group-append">
							<button className="btn btn-success" onClick={() => signInPhone(phoneNumber)} type="submit">
								Go
							</button>
						</div>
					</div>
				</React.Frament>
			)}
			{showVerification && (
				<React.Frament>
					<h2 style={{ textAlign: 'center' }}>Enter Verification Code</h2>
					<Input
						name="verificationCode"
						onChange={(e, { value }) => setVerificationCode(value)}
						type="text"
						value={verificationCode}
						autoComplete="off"
						autoFocus
						placeholder="Verification Number"
					/>
				</React.Frament>
			)}
		</Formik>
	)
}

const enhancer = compose(
	withFirebase,
	withState('phoneNumber', 'setPhoneNumber', ''),
	withState('captchaResponse', 'setCaptchaResponse', ''),
	withState('confirmationResult', 'setConfirmationResult', ''),
	withState('verification', 'showVerification', false),
	withState('verificationCode', 'setVerificationCode', ''),
	withHandlers({
		signInPhone: ({ firebase, showVerification, captchaResponse, setConfirmationResult }) => values => {
			const { phoneNumber } = values
			const appVerifier = window.recaptchaVerifier
			if (captchaResponse.length > 0) {
				firebase
					.signInWithPhoneNumber(phoneNumber, appVerifier)
					.then(confirmationResult => {
						// const verificationCode = window.prompt()
						// return confirmationResult.confirm(verificationCode)
						setConfirmationResult(confirmationResult)
						showVerification(true)
					})
					.catch(error => toast.error(`Sign In With Phone Number Error: ${error.message}`))
			}
		},
		handleVerification: ({ confirmationResult, verificationCode, setVerificationCode }) => () => {
			confirmationResult
				.confirm(verificationCode)
				.then(user => {
					// If you need to do anything with the user, do it here
					// The user will be logged in automatically by the
					// `onAuthStateChanged` listener we set up in App.js earlier
					console.log(user)
					setVerificationCode('')
				})
				.catch(error => {
					const { code, message } = error
					// For details of error codes, see the docs
					// The message contains the default Firebase string
					// representation of the error
				})
		}
	}),
	withFormik({
		mapPropsToValues: props => {
			return { ...props.initialValue }
		},
		// Custom sync validation

		validationSchema: () =>
			yup.object().shape({
				phoneNumber: yup.string()
			}),
		handleSubmit: (values, { setSubmitting, props: { signInPhone } }) => {
			setTimeout(() => {
				// alert(JSON.stringify(values, null, 2))
				signInPhone(values)
				setSubmitting(false)
			}, 1000)
		},
		displayName: 'PhoneVerify'
	})
)

export default enhancer(PhoneVerify)
