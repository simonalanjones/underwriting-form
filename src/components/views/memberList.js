import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMembers, memberCount } from '../../services/memberData';
import MemberListItem from './memberListItem';

function Memberlist() {
	const params = useParams();
	const selectedId = params.member || null;
	const members = getMembers();

	// sort members so main subscriber listed first
	members.sort(function (a, b) {
		return a.relation.search('subscriber') > 0 ? -1 : 0;
	});

	const memberList = members.map((member) => (
		<MemberListItem
			key={member.id}
			member={member}
			selected={member.id === selectedId}
		/>
	));

	const headingStyle = {
		textTransform: 'uppercase',
		fontSize: '0.85em',
		letterSpacing: '1px',
	};

	return (
		<>
			{memberCount() > 0 && (
				<>
					<div className="shadow-sm bg-white pb-3 border-top">
						<div className="pt-4">
							<h6 className="pb-3 px-4" style={headingStyle}>
								Members
							</h6>
						</div>

						<ul className="list-group list-group-flush pb-4">{memberList}</ul>

						<Link to="/members/add" className="mx-4 btn btn-sm btn-secondary">
							Add
						</Link>
					</div>
				</>
			)}
		</>
	);
}

export default Memberlist;
