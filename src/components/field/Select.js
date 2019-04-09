import React from 'react'
import { Select } from 'semantic-ui-react'

export const FieldSelect = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	const status = [
		{ key: 0, text: '未上架', value: 0 },
		{ key: 1, text: '已上架', value: 1 },
		{ key: 2, text: '特價中', value: 2 }
	]
	return (
		<Select
			{...field}
			{...props}
			error={touched[field.name] && errors[field.name]}
			placeholder={touched[field.name] && errors[field.name]}
			onChange={(e, { name, value }) => setFieldValue(name, value)}
			options={status}
		/>
	)
}
