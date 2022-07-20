import { useParams, Link, useNavigate } from 'react-router-dom';
import {
	getMember,
	deleteMember,
	updateMember,
} from '../../services/memberDataService';

// move this to components
import ViewMember from '../../routes/viewMember';
import MemberConditions from '../memberConditions';

export default function MemberView({
	//callbackConditionDelete,
	//callbackMemberDelete,
	callbackSetSelectedMember,
}) {
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
			<ViewMember
				member={member}
				// point below up to top
				//callbackDeleteCondition={callbackConditionDelete}
				//callbackDeleteMember={callbackMemberDelete}
				callbackDeleteMember={callbackDeleteMember}
				callbackSelected={callbackSetSelectedMember}
			/>
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
