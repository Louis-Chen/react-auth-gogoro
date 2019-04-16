import React, { Component, useState } from 'react'
import { compose } from 'recompose'
import { Form, Input, Button } from 'semantic-ui-react'
import { withFirebase } from 'react-redux-firebase'

class UserPhone extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleVerification = this.handleVerification.bind(this)
		this.state = {
			phoneNumber: '',
			captchaRespone: '',
			showVerification: false,
			verificationCode: ''
		}
	}
	handleSubmit(e) {
		const { firebase } = this.props
		e.preventDefault()
		//	const phone ='+12345678000'
		const { phoneNumber } = this.state
		if (this.state.captchaRespone.length > 0) {
			let appVerifier = window.recaptchaVerifier
			firebase
				.signInWithPhoneNumber(phoneNumber, appVerifier)
				.then(confirmResult => {
					// This means that the SMS has been sent to the user
					// You need to:
					//   1) Save the `confirmResult` object to use later
					this.setState({ confirmResult, showVerification: true })
					//   2) Hide the phone number form
					//   3) Show the verification code form
				})
				.catch(error => {
					const { code, message } = error
					// For details of error codes, see the docs
					// The message contains the default Firebase string
					// representation of the error
				})
		}
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleVerification(e) {
		e.preventDefault()
		const { confirmResult, verificationCode } = this.state
		confirmResult
			.confirm(verificationCode)
			.then(user => {
				// If you need to do anything with the user, do it here
				// The user will be logged in automatically by the
				// `onAuthStateChanged` listener we set up in App.js earlier
				console.log(user)
				this.setState({
					verificationCode: ''
				})
			})
			.catch(error => {
				const { code, message } = error
				// For details of error codes, see the docs
				// The message contains the default Firebase string
				// representation of the error
			})
	}
	componentDidMount() {
		const { firebase } = this.props

		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
			size: 'normal',
			callback: response => {
				// reCAPTCHA solved, allow signInWithPhoneNumber.
				// ...
				console.log(response)
				this.setState({
					captchaRespone: response
				})
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
	render() {
		return (
			<Form>
				{!this.state.showVerification && (
					<Form.Field>
						<label>手機驗證</label>
						<Input
							name="phoneNumber"
							autoFocus={true}
							onChange={this.handleChange}
							type="text"
							value={this.state.phoneNumber}
							autoComplete="off"
						/>
						<Button onClick={this.handleSubmit} type="submit" content="送出" />
						<div id="sign-in-button" />
					</Form.Field>
				)}
				{this.state.showVerification && (
					<Form.Field>
						<label>手機驗證</label>
						<div id="sign-in-button" />
						<Input
							name="verificationCode"
							onChange={this.handleChange}
							type="text"
							value={this.state.verificationCode}
							autoComplete="off"
							autoFocus={true}
						/>
						<Button onClick={this.handleVerification} type="submit" content="驗證" />
					</Form.Field>
				)}
			</Form>
		)
	}
}

const enhancer = compose(withFirebase)
export default enhancer(UserPhone)
