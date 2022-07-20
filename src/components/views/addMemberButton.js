import React from 'react';

function AddMemberButton({ onAddEvent }) {
	return (
		<button className="btn btn-primary" onClick={onAddEvent}>
			Add Member
		</button>
	);
}

export default AddMemberButton;
