import React from 'react';

const RadioOptions = ({
	name,
	changeHandler,
	options,
	checkedItem,
	required,
	className,
	errorMessage,
}) => {
	return (
		<>
			{options.map((item, index) => (
				<div key={index} className="form-check">
					<input
						className={className}
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

					{index === options.length - 1 && errorMessage && (
						<div
							data-testid="invalid-feedback-agent-dept"
							className="invalid-feedback"
						>
							{errorMessage}
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default RadioOptions;
