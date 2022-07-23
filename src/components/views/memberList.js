import React from 'react';
import { Link, useParams } from 'react-router-dom';
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

	return (
		<>
			{memberCount() > 0 && (
				<>
					<h6 className="pb-1">Members</h6>
					<ul className="list-group shadow-sm">{memberList}</ul>
				</>
			)}
			<div className="mt-4">
				<Link to="/members/add" className="btn btn-secondary">
					Add member
				</Link>
			</div>
		</>
	);
}

export default Memberlist;
