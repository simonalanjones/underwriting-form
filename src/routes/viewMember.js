//import MemberStub from '../components/memberStub';
import { Link } from 'react-router-dom';
import MemberConditions from '../components/memberConditions';

export default function MemberView({ member, callbackDeleteCondition }) {
	return (
		<>
			<MemberConditions
				member={member}
				deleteConditionCallback={callbackDeleteCondition}
			/>

			<div className="d-flex gap-2">
				<Link
					to={`/members/add-condition/${member.id}`}
					className="btn btn btn-secondary"
				>
					Add condition
				</Link>
			</div>
		</>
	);
}
