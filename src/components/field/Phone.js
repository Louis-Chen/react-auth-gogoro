import React from 'react'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
export const FieldPhone = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue, isSubmitting }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	return (
		<PhoneInput
			country="TW"
			{...field}
			disabled={isSubmitting}
			onChange={value => {
				props.setPhone(value)
				setFieldValue(field.name, value)
			}}
			error={touched[field.name] && errors[field.name]}
			placeholder={props.placeholder}
		/>
	)
}
