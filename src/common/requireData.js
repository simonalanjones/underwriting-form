import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasAgent } from '../services/agentData';
import { hasMembership } from '../services/membershipData';

export default function RequireData({ children }) {
	const [location, setLocation] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (location !== '') {
			navigate(location);
		}
	}, [location, navigate]);

	if (!hasAgent() && location === '') {
		setLocation('/agent');
	} else if (!hasMembership() && location === '') {
		setLocation('/membership');
	} else {
		return children;
	}
}
