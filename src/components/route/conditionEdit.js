import { useParams } from 'react-router-dom';
import EditCondition from '../views/editCondition';
import { getMember, updateMember } from '../../services/memberData';
import { useNavigate } from 'react-router-dom';

export default function ConditionEdit() {
	const params = useParams();
	const member = getMember(params.member);
	const navigate = useNavigate();

	const condition = member['conditions'].find(
		(element) => element.id === params.condition
	);

	function callbackConditionEdit(member, condition) {
		member.conditions = member.conditions.map((_condition) =>
			_condition.id === condition.id ? condition : _condition
		);

		updateMember(member);
		navigate(`/members/view/${member.id}`);
	}

	return (
		<EditCondition
			callbackUpdate={callbackConditionEdit}
			callbackCancel={() => {
				navigate(`/members/view/${member.id}`);
			}}
			condition={condition}
			member={member}
		/>
	);
}
