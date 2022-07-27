import { useNavigate } from 'react-router-dom';

export default function MemberListItem({ member, selected }) {
	const navigate = useNavigate();
	const memberName = `${member.userFirstName} ${member.userLastName}`;
	const className = selected ? 'list-group-item active' : 'list-group-item';
	const navigateUrl = () => navigate(`/members/view/${member.id}`);
	return (
		<li onClick={navigateUrl} className={className}>
			{memberName}
		</li>
	);
}
