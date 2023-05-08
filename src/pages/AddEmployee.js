import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function AddEmployee() {
	const [addForm, setAddForm] = useState({
		name: '',
		gender: 'male',
		birthday: '',
		hireDate: moment().format('YYYY-MM-DD'),
		departmentID: 0,
		salary: 0,
	});

	const [departments, setDepartments] = useState([
		{
			departmentID: '',
			name: '',
			description: '',
		},
	]);
	async function manejarEnvioDeFormulario(evento) {
		evento.preventDefault();
		// Codificar nuestro videojuego como JSON
		console.log(addForm);
		const cargaUtil = JSON.stringify(addForm);
		// ¡Y enviarlo!
		const respuesta = await fetch(
			`${'http://localhost:8000'}/addEmployee.php`,
			{
				method: 'POST',
				body: cargaUtil,
			}
		);
		console.log('resp ', respuesta);
		const exitoso = await respuesta.json();
		if (exitoso) {
			console.log('success added', exitoso);
			toast.success('Added Employee ', {
				position: 'bottom-right',
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setAddForm({
				name: '',
				gender: 'male',
				birthday: '',
				hireDate: moment().format('YYYY-MM-DD'),
				departmentID: '0',
				salary: 0,
			});
		} else {
			console.log('error');
			toast.error('Error!!. Try again');
		}
	}
	function manejarCambio(evento) {
		// Extraer la clave del estado que se va a actualizar, así como el valor
		const clave = evento.target.id;
		let valor = evento.target.value;
		setAddForm({
			...addForm,
			[clave]: valor,
		});
	}

	useEffect(() => {
		async function fetchData() {
			const respuesta = await fetch(
				`${'http://localhost:8000'}/getDepartments.php`
			);
			const departmentList = await respuesta.json();
			setDepartments(departmentList);
			console.log(departmentList);
		}
		fetchData();
	}, []);

	useEffect(() => {
		console.log(addForm);
	}, [addForm]);

	return (
		<div className='w-[80%] flex flex-col mx-[10%] mt-4'>
			<div className='text-xl mb-6'>{'Add Employee'}</div>
			<ToastContainer></ToastContainer>
			<div className='flex justify-start w-[80%] mx-[10%] overflow-auto max-h-full sm:max-h-[500px]'>
				<form
					className='field w-full '
					onSubmit={(e) => manejarEnvioDeFormulario(e)}
				>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div className='form-group'>
							<label
								className='block text-sm text-gray-600 mb-2'
								htmlFor='name'
							>
								{'Name:'}
							</label>
							<input
								autoFocus
								required
								placeholder='Name'
								type='text'
								id='name'
								value={addForm.name}
								onChange={manejarCambio}
								className='outline-0 placeholder:text-gray-400 placeholder:text-sm text-sm block bg-white w-full border border-slate-300 rounded-lg py-[6px] pl-4 pr-3 shadow-sm'
							/>
						</div>
						<div className='form-group'>
							<label
								for='departmentID'
								className='block mb-2 text-sm text-gray-600'
							>
								{'Select a department:'}
							</label>
							<select
								required
								onChange={manejarCambio}
								id='departmentID'
								className='bg-gray-50 outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2 py-2'
							>
								<option
									key={`depmnt-empty}`}
									value={''}
									selected={addForm.departmentID === '0'}
								>
									{'--------'}
								</option>
								{departments.map((department, index) => (
									<option
										key={`depmnt-${index}`}
										value={department.departmentID}
										selected={
											addForm.departmentID ===
											department.departmentID
										}
									>
										{department.name}
									</option>
								))}
							</select>
						</div>

						<div className='form-group inline-block'>
							<label
								className='label text-sm text-gray-600 mb-2'
								htmlFor='gender'
							>
								{'Gender:'}
							</label>
							<br />
							<div className='flex items-center mb-2'>
								<input
									type='radio'
									id='gender'
									name='gender'
									value='male'
									className='outline-0'
									onChange={manejarCambio}
									checked={addForm.gender === 'male'}
								/>
								<label
									htmlFor='male'
									className='block ml-2 text-base text-gray-700'
								>
									{'Male'}
								</label>
							</div>
							<div className='flex items-center mb-2'>
								<input
									type='radio'
									id='gender'
									name='gender'
									className='outline-0'
									value='female'
									onChange={manejarCambio}
									checked={addForm.gender === 'female'}
								/>
								<label
									htmlFor='female'
									className='block ml-2 text-base text-gray-700'
								>
									{'Female'}
								</label>
							</div>
						</div>
						<div className='form-group inline-block'>
							<label
								className='label text-sm text-gray-600 mb-2'
								htmlFor='birthday'
							>
								{'Birthday:'}
							</label>
							<br />
							<input
								required
								placeholder='Calificación'
								type='date'
								id='birthday'
								onChange={manejarCambio}
								value={addForm.birthday}
								className='outline-0'
							/>
						</div>
						<div className='form-group inline-block'>
							<label
								className='label text-sm text-gray-600 mb-2'
								htmlFor='salary'
							>
								{'Salary (per Month):'}
							</label>
							<br />
							<input
								required
								placeholder='0'
								type='number'
								id='salary'
								min={'0'}
								value={addForm.salary}
								onChange={manejarCambio}
								className='outline-0 placeholder:text-gray-400 placeholder:text-sm text-sm block bg-white w-full border border-slate-300 rounded-lg py-[6px] pl-4 pr-3 shadow-sm'
							/>
						</div>
						<div className='form-group inline-block'>
							<label
								className='label text-sm text-gray-600 mb-2'
								htmlFor='hireDate'
							>
								{'Hire Date:'}
							</label>
							<br />
							<input
								required
								placeholder='Hire Date'
								type='date'
								id='hireDate'
								onChange={manejarCambio}
								className='outline-0'
								defaultValue={moment().format('YYYY-MM-DD')}
							/>
						</div>
					</div>
					<div className='form-group flex justify-end mt-4'>
						<button className='bg-gray-200 rounded-lg px-3 py-2 text-gray-800'>
							{'Guardar'}
						</button>
						&nbsp;
						<Link
							to='/employees'
							className='bg-red-400 ml-2 rounded-lg px-3 py-2 text-white'
						>
							{'Volver'}
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddEmployee;
