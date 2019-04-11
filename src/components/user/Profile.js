import React from 'react'
import { Prompt } from 'react-router-dom'
import { Form, Button, Header, Divider, Label } from 'semantic-ui-react'
import { Form as Formik, withFormik, Field, ErrorMessage } from 'formik'
import { compose, withHandlers } from 'recompose'

import { Field as Input } from '../field'
import * as yup from 'yup'
import { withFirebase, withFirestore } from 'react-redux-firebase'

const UserProfile = props => {
	const { isVerify, phoneNumberVerify, firebase } = props
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
