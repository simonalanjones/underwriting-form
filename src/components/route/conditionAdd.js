import { useParams, useNavigate } from 'react-router-dom';
import { getMember, updateMember } from '../../services/memberData';
import AddCondition from '../views/addCondition';

export default function ConditionAdd() {
	const params = useParams();
	const member = getMember(params.member);
	const navigate = useNavigate();

	function callbackConditionAdd(member, condition) {
		member.conditions.push(condition);
		updateMember(member);
		navigate(`/members/view/${member.id}`);
	}

	return (
		<AddCondition
			member={member}
			callbackUpdate={callbackConditionAdd}
			callbackCancel={() => {
				navigate(`/members/view/${member.id}`);
			}}
		/>
	);
}
