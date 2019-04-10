import React from 'react'
import { Button, Form, Header, Divider } from 'semantic-ui-react'
import { Form as Formik, Field, withFormik, ErrorMessage } from 'formik'
import * as yup from 'yup'

import { Field as Input } from '../field'

const AuthLogin = props => {
	return (
		<Form>
			<Header as="h1" content="登入表單" />
			<Divider />
			<Formik>
				<Form.Field>
					<label>帳號/信箱：</label>
					<Field name="email" type="email" placeholder="帳號(信箱)" component={Input.Text} />
					<ErrorMessage name="email" />
				</Form.Field>
				<Form.Field>
					<label>密碼：</label>
					<Field name="password" type="password" placeholder="密碼" component={Input.Text} />
					<ErrorMessage name="password" />
				</Form.Field>

				<Button type="submit" fluid content="登入" />
			</Formik>
		</Form>
	)
}

const enhancer = withFormik({
	mapPropsToValues: () => ({ email: '', password: '' }),

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
				.min(6, '不可小於6個字')
		}),
	handleSubmit: (values, { setSubmitting, resetForm, props: { emailLogin } }) => {
		setTimeout(() => {
			// alert(JSON.stringify(values, null, 2))
			emailLogin(values)
			setSubmitting(false)
			resetForm()
		}, 1000)
	},

	displayName: 'AuthLogin'
})
export default enhancer(AuthLogin)
