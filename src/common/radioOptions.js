import React from 'react';

const RadioOptions = ({
	name,
	changeHandler,
	options,
	checkedItem,
	required,
}) => {
	return (
		<>
			{options.map((item, index) => (
				<div key={index} className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name={name}
						id={name + item}
						value={item}
						onChange={changeHandler}
						checked={checkedItem === item}
						required={required}
					/>
					<label className="form-check-label" htmlFor={name + item}>
						{item}
					</label>
					{index === options.length - 1 && (
						<div className="invalid-feedback"> Please choose an option</div>
					)}
				</div>
			))}
		</>
	);
};

export default RadioOptions;
