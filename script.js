const eventDetails = {
	'Web Design': ['18 October 2026', '10:00 AM - 12:00 PM', 'Computer Lab'],
	'AI Quiz': ['18 October 2026', '10:30 AM - 11:30 AM', 'Seminar Hall'],
	'Paper Presentation': ['18 October 2026', '11:00 AM - 1:00 PM', 'Main Auditorium'],
	'Debugging': ['18 October 2026', '1:30 PM - 3:00 PM', 'Computer Lab'],
	'Technical Connection': ['18 October 2026', '2:00 PM - 3:00 PM', 'Block A Classroom'],
	'Problem Solving': ['18 October 2026', '3:00 PM - 4:00 PM', 'Innovation Lab'],
	'Gaming': ['18 October 2026', '3:30 PM - 5:00 PM', 'Student Activity Room'],
	'Singing Competition': ['18 October 2026', '4:00 PM - 6:00 PM', 'Main Auditorium']
};

const params = new URLSearchParams(window.location.search);
const selectedEvent = params.get('event') || 'Web Design';
const details = eventDetails[selectedEvent] || eventDetails['Web Design'];
const eventName = eventDetails[selectedEvent] ? selectedEvent : 'Web Design';

const eventNameElement = document.querySelector('#event-name');
const modalEventName = document.querySelector('#modal-event-name');
if (eventNameElement) {
	eventNameElement.textContent = eventName;
	document.querySelector('#event-date').textContent = details[0];
	document.querySelector('#event-time').textContent = details[1];
	document.querySelector('#event-place').textContent = details[2];
	modalEventName.textContent = eventName;
}

const modal = document.querySelector('#register-modal');
const openRegister = document.querySelector('#open-register');
const closeRegister = document.querySelector('#close-register');
const eventForm = document.querySelector('#event-form');
const formMessage = document.querySelector('#form-message');
const qrResult = document.querySelector('#qr-result');
const qrCode = document.querySelector('#qr-code');
const registrationSuccess = document.querySelector('#registration-success');

openRegister?.addEventListener('click', () => {
	modal.hidden = false;
	eventForm.hidden = false;
	qrResult.hidden = true;
	formMessage.textContent = '';
	qrCode.innerHTML = '';
	registrationSuccess.textContent = '';
	openRegister.setAttribute('aria-expanded', 'true');
	document.body.classList.add('modal-open');
	document.querySelector('#event-form input')?.focus();
});

const closeModal = () => {
	modal.hidden = true;
	document.body.classList.remove('modal-open');
	openRegister?.setAttribute('aria-expanded', 'false');
};

closeRegister?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
	if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
});

eventForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	const registration = Object.fromEntries(new FormData(eventForm));
	const qrData = JSON.stringify({
		event: eventName,
		date: details[0],
		time: details[1],
		place: details[2],
		student: registration
	});

	eventForm.hidden = true;
	formMessage.textContent = `Registration complete for ${eventName}.`;
	qrResult.hidden = false;
	registrationSuccess.textContent = 'Registration successful';
	if (window.QRCode) {
		new QRCode(qrCode, { text: qrData, width: 180, height: 180, colorDark: '#192b91', colorLight: '#ffffff' });
	}
});
