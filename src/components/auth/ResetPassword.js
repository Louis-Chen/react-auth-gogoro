import React from 'react'
import { Form, Button, Header, Divider } from 'semantic-ui-react'
import { Form as Formik, Field, withFormik } from 'formik'
import { Field as Input } from 'components/field'
import * as yup from 'yup'

const VerifyResetPassword = props => {
	return (
		<Form>
			<Header content="忘記密碼" />
			<Divider />
			<Formik>
				<Form.Group widths="equal">
					<Form.Field>
						<label>請輸入新密碼</label>
						<Field name="password" type="password" component={Input.Text} />
					</Form.Field>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Field>
						<label>請重新輸入新密碼</label>
						<Field name="confirm_password" type="password" component={Input.Text} />{' '}
					</Form.Field>
				</Form.Group>
				<Button fluid type="submit" content="確認變更" />
			</Formik>
		</Form>
	)
}

const enhancer = withFormik({
	mapPropsToValues: () => ({ account: '', password: '', confirm_password: '' }),

	// Custom sync validation

	validationSchema: () =>
		yup.object().shape({
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

	displayName: 'RestPassword'
})

export default enhancer(VerifyResetPassword)
