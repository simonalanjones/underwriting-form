import { useParams, Link, useNavigate } from 'react-router-dom';
import {
	getMember,
	deleteMember,
	updateMember,
} from '../../services/memberData';

// move this to components
import ViewMember from '../views/viewMember';
import MemberConditions from '../views/memberConditions';

export default function MemberView() {
	const params = useParams();
	const member = getMember(params.member);
	const navigate = useNavigate();

	function callbackDeleteMember(id) {
		deleteMember(id);
		navigate('/members');
	}

	function callbackDeleteCondition(condition, member) {
		member.conditions = member.conditions.filter(
			(_condition) => _condition.id !== condition.id
		);

		updateMember(member);
	}

	return (
		<>
			<ViewMember member={member} callbackDeleteMember={callbackDeleteMember} />
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
