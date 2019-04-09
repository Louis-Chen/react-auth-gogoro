import React from 'react'
import { Form, Button, Header, Divider } from 'semantic-ui-react'
import { Form as Formik, withFormik, Field, ErrorMessage } from 'formik'
import { compose } from 'recompose'

import { Field as Input } from '../field'
import * as yup from 'yup'

const AuthRegister = props => {
	return (
		<Form>
			<Header as="h1" content="註冊表單" />
			<Divider />
			<Formik>
				<Form.Field>
					<label>帳號：</label>
					<Field name="account" type="email" placeholder="帳號(信箱)" component={Input.Text} />
					<ErrorMessage name="account" />
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
	withFormik({
		mapPropsToValues: () => ({ account: '', password: '', confirm_password: '' }),

		// Custom sync validation

		validationSchema: () =>
			yup.object().shape({
				account: yup
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
		handleSubmit: (values, { setSubmitting }) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2))
				setSubmitting(false)
			}, 1000)
		},

		displayName: 'AuthRegister'
	})
)

export default enhancer(AuthRegister)
