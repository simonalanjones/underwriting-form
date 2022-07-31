import { memberCount } from '../../services/memberData';
import MemberAdd from './memberAdd';
import MemberSelect from '../views/memberSelect';

export default function MemberIndex({ postback }) {
	if (memberCount() === 0) {
		return <MemberAdd postback={postback} />;
	} else {
		return <MemberSelect />;
	}
}
