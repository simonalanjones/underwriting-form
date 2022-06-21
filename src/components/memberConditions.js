import ConditionStub from '../components/conditionStub';
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
