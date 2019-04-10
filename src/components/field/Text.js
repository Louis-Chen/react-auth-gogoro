import React from 'react'
import { Input } from 'semantic-ui-react'

export const FieldText = ({ field, form: { isSubmitting, touched, errors }, ...props }) => {
	return (
		<Input
			{...field}
			disabled={isSubmitting}
			type={props.type}
			error={touched[field.name] && errors[field.name]}
			placeholder={props.placeholder}
		/>
	)
}
