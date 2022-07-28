import { useEffect, useState } from 'react';
import EditMember from '../views/editMember';
import { getMember, updateMember } from '../../services/memberData';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function MemberEdit() {
	const [member, setMember] = useState('');
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const member = getMember(params.member);
		if (!member) {
			navigate('/');
		} else {
			setMember(member);
		}
	}, [navigate, params.member]);

	function callbackMemberEdit(member) {
		updateMember(member);
		navigate(`/members/view/${member.id}`);
	}

	return (
		<>
			{member && (
				<EditMember
					member={member}
					callbackUpdate={callbackMemberEdit}
					callbackCancel={() => {
						navigate(`/members/view/${member.id}`);
					}}
				/>
			)}
		</>
	);
}
