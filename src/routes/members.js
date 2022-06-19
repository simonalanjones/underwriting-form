import { Link } from 'react-router-dom';
import Memberlist from '../components/memberList';
import MembershipInfo from '../components/membershipInfo';
import useLocalStorage from '../useLocalStorage';

export default function Members() {
	const [memberData] = useLocalStorage('memberData', []);
	const [membershipData] = useLocalStorage('membershipData', []);

	return (
		<>
			{Object.keys(memberData).length > 0 && (
				<div className="row">
					<div className="col-4">
						<div className="mb-5">
							<MembershipInfo data={membershipData} />
						</div>
						<Memberlist members={memberData} />
						<br />

						<Link to="/members/add-member" className="btn btn-primary">
							Add member
						</Link>
					</div>

					<div className="col-8">
						<p>[right col - member list screen]</p>
					</div>
				</div>
			)}

			{Object.keys(memberData).length === 0 && (
				<main className="container">
					<div className="bg-light p-5 rounded mt-3">
						<h1>Members</h1>
						<p className="lead">
							This example is a quick exercise to illustrate how the bottom
							navbar works.
						</p>
						<Link
							to="/members/add-member"
							className="btn btn-lg btn-primary"
							role="button"
						>
							Add first member »
						</Link>
					</div>
				</main>
			)}
		</>
	);
}
