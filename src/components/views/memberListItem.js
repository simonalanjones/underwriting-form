import { useNavigate } from 'react-router-dom';

export default function MemberListItem({ member, selected }) {
	const navigate = useNavigate();
	return (
		<li
			onClick={() => navigate(`/members/view/${member.id}`)}
			className={selected ? 'list-group-item active' : 'list-group-item'}
		>
			<div className="d-flex">
				{/* <div className="">
										<MemberIcon width="16" height="16" />
										&nbsp;&nbsp;
									</div> */}

				<div className="pt-0 pb-0">
					{`${member.userFirstName} ${member.userLastName}`}
					{/* <small>{member.relation}</small>
										<div className="d-sm-none d-xs-none d-md-block">
											{member.conditions.length} condition
											{member.conditions.length !== 1 && 's'}
											&nbsp;added
										</div> */}
				</div>
			</div>
		</li>
	);
}
