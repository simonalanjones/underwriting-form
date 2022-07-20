import { useEffect } from 'react';
import Toast from '../common/toast';
import { Toast as BootstrapToast } from 'bootstrap';

export default function Messages({ messageState, callbackMessageDelete }) {
	useEffect(() => {
		const options = {
			//animation: true,
			//delay: 2500,
			//autohide: false,
		};

		const toastElList = [].slice.call(document.querySelectorAll('.toast'));
		toastElList.map(function (toastEl) {
			toastEl.addEventListener('hidden.bs.toast', function () {
				callbackMessageDelete(toastEl.id);
			});
			const toast = new BootstrapToast(toastEl, options);
			return toast.show();
		});
	}, [callbackMessageDelete]);

	return (
		<div className="px-5">
			{messageState.length > 0 &&
				messageState.map((message, index) => (
					<Toast key={message.id} id={message.id} body={message.body} />
				))}
		</div>
	);
}
