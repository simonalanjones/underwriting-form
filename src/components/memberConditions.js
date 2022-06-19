import ConditionStub from '../components/conditionStub';
//import { Link } from 'react-router-dom';
function MemberConditions({ member, deleteConditionCallback }) {
	return (
		<>
			<h6 className="pb-1">Conditions</h6>
			{member.conditions.length > 0 && (
				<>
					{member.conditions.map((condition, index) => (
						<ConditionStub
							condition={condition}
							key={index}
							handleDelete={deleteConditionCallback}
							member={member}
						/>
					))}
				</>
			)}

			{member.conditions.length === 0 && (
				// <div className="col-lg-6 mx-auto">
				<div className="border bg-white rounded px-4 pt-4 mb-4 shadow-sm">
					<p className="mb-4">
						There are no conditions entered for this member.
					</p>
				</div>
			)}
		</>
	);
}

export default MemberConditions;
