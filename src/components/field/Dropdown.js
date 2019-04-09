import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// options = [
//     {
//       "key": "Lexus Hettinger",
//       "text": "Lexus Hettinger",
//       "value": "lexus_hettinger"
//     },
//   ]

export const FieldDropdown = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => (
	<Dropdown
		{...field}
		{...props}
		error={touched[field.name] && errors[field.name]}
		placeholder={touched[field.name] && errors[field.name]}
		onChange={(e, { name, value }) => setFieldValue(name, value)}
		fluid
		multiple={false || props.multiple}
		search={false || props.search}
		selection
		options={props.options}
	/>
)
