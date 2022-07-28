import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
	getMember,
	deleteMember,
	updateMember,
} from '../../services/memberData';

import ViewMember from '../views/viewMember';
import MemberConditions from '../views/memberConditions';

export default function MemberView() {
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
			{member && (
				<>
					<ViewMember
						member={member}
						callbackDeleteMember={callbackDeleteMember}
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
			)}
		</>
	);
}
