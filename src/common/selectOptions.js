import React from 'react';

const SelectOptions = ({
	name,
	changeHandler,
	options,
	selected,
	required,
}) => {
	return (
		<select
			name={name}
			id={name}
			className="form-select"
			onChange={changeHandler}
			required={required}
			aria-label="select option"
			value={selected}
		>
			<option value="">Select an option</option>
			{options.map((item, index) => (
				<option key={index} value={item}>
					{item}
				</option>
			))}
		</select>
	);
};

export default SelectOptions;
