import ConditionStub from './conditionStub';
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
				<div className="bg-white px-4 pt-4 pb-1 shadow-sm">
					<p className="mb-4">No conditions entered for this member.</p>
				</div>
			)}
			{/* <div className="alert alert-warning" role="alert">
				Conditional Switch requires conditions from last 12 months declaration
				and planned / pending to be declared
			</div> */}
		</>
	);
}

export default MemberConditions;
