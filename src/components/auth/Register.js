import React from 'react'
import { Form, Button, Header, Divider } from 'semantic-ui-react'
import { Form as Formik, withFormik, Field, ErrorMessage } from 'formik'
import { compose, withHandlers } from 'recompose'

import { Field as Input } from '../field'
import * as yup from 'yup'
import { withFirebase } from 'react-redux-firebase'
import { toast } from 'react-toastify'

const AuthRegister = props => {
	return (
		<Form>
			<Header as="h1" content="註冊表單" />
			<Divider />
			<Formik>
				<Form.Field>
					<label>帳號：</label>
					<Field name="email" type="email" placeholder="帳號(信箱)" component={Input.Text} />
					<ErrorMessage name="email" />
				</Form.Field>
				<Form.Field>
					<label>密碼：</label>
					<Field name="password" type="password" placeholder="密碼" component={Input.Text} />
					<ErrorMessage name="password" />
				</Form.Field>
				<Form.Field>
					<label>再一次輸入密碼：</label>
					<Field name="confirm_password" type="password" placeholder="密碼" component={Input.Text} />
					<ErrorMessage name="confirm_password" />
				</Form.Field>
				<Button type="submit" fluid content="登入" />
			</Formik>
		</Form>
	)
}

const enhancer = compose(
	withFirebase,
	withHandlers({
		emailRegister: ({ firebase }) => creds => {
			firebase
				.createUser({ email: creds.email, password: creds.password })
				.then(res => {
					toast.success('註冊成功!', {
						position: toast.POSITION.TOP_CENTER
					})
				})
				.then(() => {
					firebase
						.auth()
						.currentUser.sendEmailVerification()
						.then(
							res => {
								toast.success(`送出驗證信`, {
									position: toast.POSITION.TOP_CENTER
								})
							},
							err => {
								toast.error(`送出驗證信失敗，${err}`, {
									position: toast.POSITION.TOP_CENTER
								})
							}
						)
				})
				.catch(err => {
					toast.error(`"註冊錯誤! ${err}"`, {
						position: toast.POSITION.TOP_CENTER
					})
				})
		}
	}),
	withFormik({
		mapPropsToValues: () => ({ email: '', password: '', confirm_password: '' }),

		// Custom sync validation

		validationSchema: () =>
			yup.object().shape({
				email: yup
					.string()
					.email('不符合信箱格式')
					.required('必填'),
				password: yup
					.string()
					.required('必填')
					.min(6, '不可小於6個字'),
				confirm_password: yup
					.string()
					.required('必填')
					.min(6, '不可小於6個字')
					.oneOf([yup.ref('password')], '密碼不相同')
			}),
		handleSubmit: (values, { setSubmitting, props: { emailRegister } }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2))
				emailRegister(values)
				setSubmitting(false)
			}, 1000)
		},

		displayName: 'AuthRegister'
	})
)

export default enhancer(AuthRegister)
