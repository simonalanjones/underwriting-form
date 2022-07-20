import EditMember from '../../routes/editMember';
import { getMember, updateMember } from '../../services/memberDataService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function MemberEdit() {
	const params = useParams();
	const member = getMember(params.member);
	const navigate = useNavigate();

	function callbackMemberEdit(member) {
		updateMember(member);
		navigate(`/members/view/${member.id}`);
	}

	return (
		<EditMember
			member={member}
			callbackUpdate={callbackMemberEdit}
			callbackCancel={() => {
				navigate(`/members/view/${member.id}`);
			}}
		/>
	);
}
