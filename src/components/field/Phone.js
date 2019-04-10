import React from 'react'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'

export const FieldPhone = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue, isSubmitting }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	return (
		<ReactPhoneInput
			defaultCountry={'tw'}
			{...field}
			disabled={isSubmitting}
			
			onChange={(e, { name, value }) => setFieldValue(name, value)}
			error={touched[field.name] && errors[field.name]}
			placeholder={props.placeholder}
		/>
	)
}
