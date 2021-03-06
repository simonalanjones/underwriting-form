import { memberCount } from '../../services/memberData';
import MemberAdd from './memberAdd';

export default function MemberIndex({ postback }) {
	if (memberCount() === 0) {
		return <MemberAdd postback={postback} />;
	} else
		return (
			<div className="border bg-white rounded px-4 pt-4 pb-4 shadow-sm">
				Select a member to continue.
			</div>
		);
}
