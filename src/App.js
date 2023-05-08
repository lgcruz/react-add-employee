import { useEffect, useState } from 'react';
import './App.css';
import ListEmployee from './pages/ListEmployees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import AddEmployee from './pages/AddEmployee';
import axios from 'axios';

function App() {
	const [employees, setEmployees] = useState([]);

	async function fetchData() {
		const config = {
			Headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers':
					'Origin, X-Requested-With, Content-Type, Accept',
			},
		};
		const respuesta = await axios.get(
			'http://localhost:8000/getEmployees.php',
			config
		);
		// const respuesta = await fetch(
		// 	`${'https://a736-191-99-2-44.ngrok-free.app'}/getEmployees.php`
		// );
		console.log(respuesta);
		const empleados = await respuesta.data;
		setEmployees(empleados);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route
						index
						element={
							<ListEmployee
								employees={employees}
								reload={fetchData}
							/>
						}
					/>
					<Route
						path='/employees'
						element={
							<ListEmployee
								employees={employees}
								reload={fetchData}
							/>
						}
					/>
					<Route
						path='/add'
						element={<AddEmployee employees={employees} />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
