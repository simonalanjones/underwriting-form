import { useParams } from 'react-router-dom';
import AddCondition from '../../routes/addCondition';
import { getMember, updateMember } from '../../services/memberDataService';
import { useNavigate } from 'react-router-dom';

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
