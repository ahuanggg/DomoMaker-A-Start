const handleDomo = (e) => {
	e.preventDefault();

	$('#domoMessage').animate({ window: 'hide' }, 350);

	if ($('#domoName').val() == '' || $('#domoAge').val() == '' || $('#domoSize').val() == '') {
		handleError('RAWR! All fields are required');
		return false;
	}

	sendAjax('POST', $('#domoForm').attr('action'), $('#domoForm').serialize(), function () {
		loadDomosFromServer();
	});

	return false;
};

const DomoForm = (props) => {
	return (
		<form id='domoForm' onSubmit={handleDomo} name='domoForm' action='/maker' method='POST' className='domoForm'>
			<label htmlFor='name'>Name: </label>
			<input id='domoName' type='text' name='name' placeholder='Domo name' />
			<label htmlFor='age'>Age: </label>
			<input id='domoAge' type='text' name='age' placeholder='Domo Age' />
			<label htmlFor='size'>Size: </label>
			<input id='domoSize' type='text' name='size' placeholder='Domo Size' />
			<label htmlFor='type'>Type: </label>
			<select id='domoSize' type='text' name='type'>
				<option value='domo'>Domo</option>
				<option value='dog'>Dog</option>
				<option value='cat'>Cat</option>
			</select>
			<input type='hidden' name='_csrf' value={props.csrf} />
			<input className='makeDomoSubmit' type='submit' value='Make Domo' />
		</form>
	);
};

const DomoList = function (props) {
	if (props.domos.length === 0) {
		return (
			<div className='domoList'>
				<h3 className='emptyDomo'>No Domos yet</h3>
			</div>
		);
	}

	const domoNodes = props.domos.map(function (domo) {
		if (domo.type == 'dog') {
			return (
				<div key={domo._id} className='domo'>
					<img src='/assets/img/dog.png' alt='domoface' className='domoFace' />
					<h3 className='domoName'> Name: {domo.name} </h3>
					<h4 className='domoAge'> Age: {domo.age} </h4>
					<h4 className='domoSize'> Size: {domo.size} </h4>
				</div>
			);
		} else if (domo.type == 'cat') {
			return (
				<div key={domo._id} className='domo'>
					<img src='/assets/img/cat.png' alt='domoface' className='domoFace' />
					<h3 className='domoName'> Name: {domo.name} </h3>
					<h4 className='domoAge'> Age: {domo.age} </h4>
					<h4 className='domoSize'> Size: {domo.size} </h4>
				</div>
			);
		} else {
			return (
				<div key={domo._id} className='domo'>
					<img src='/assets/img/domoface.jpeg' alt='domoface' className='domoFace' />
					<h3 className='domoName'> Name: {domo.name} </h3>
					<h4 className='domoAge'> Age: {domo.age} </h4>
					<h4 className='domoSize'> Size: {domo.size} </h4>
				</div>
			);
		}
	});

	return <div className='domoList'>{domoNodes}</div>;
};

const loadDomosFromServer = () => {
	sendAjax('GET', '/getDomos', null, (data) => {
		ReactDOM.render(<DomoList domos={data.domos} />, document.querySelector('#domos'));
	});
};

const setup = function (csrf) {
	ReactDOM.render(<DomoForm csrf={csrf} />, document.querySelector('#makeDomo'));
	ReactDOM.render(<DomoList domos={[]} />, document.querySelector('#domos'));

	loadDomosFromServer();
};

const getToken = () => {
	sendAjax('GET', '/getToken', null, (result) => {
		setup(result.csrfToken);
	});
};

$(document).ready(function () {
	getToken();
});
