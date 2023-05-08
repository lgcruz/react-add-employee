import { Tooltip } from 'react-tippy';
import PlusIcon from '../icons/PlusIcon';
import { Link } from 'react-router-dom';

function ListEmployee(props) {
	const { employees, reload } = props;

	return (
		<div className='w-[80%] flex flex-col mx-[10%] mt-4'>
			<div className='flex flex-col md:flex-row justify-between'>
				<div className='text-xl mb-6'>
					{'List of Employees'}
					<Tooltip
						position='top'
						html={<div className='rounded-lg '>{'Reload'}</div>}
					>
						<button
							onClick={reload}
							className='p-2 bg-gray-200 rounded-full ml-2'
						>
							<img
								src='/Reset.png'
								alt=''
								className='h-4 w-auto'
							/>
						</button>
					</Tooltip>
				</div>
				<Link
					to='/add'
					className='flex mb-6 py-1 text-lg bg-gray-200 text-gray-600 px-3 items-center rounded-lg'
				>
					<PlusIcon width={24} height={24} className='mr-2' />
					{'Add Employee'}
				</Link>
			</div>
			<div className='flex flex-col justify-start w-[80%] mx-[10%] overflow-auto max-h-[500px]'>
				<table className='table-auto w-full'>
					<thead className='mx-2'>
						<tr className='p-4'>
							<th
								key={'h-name'}
								className='rounded-l-lg p-2 text-start bg-gray-200 text-gray-600'
							>
								{'Name'}
							</th>
							<th
								key={'h-gender'}
								className='px-2 text-start bg-gray-200 text-gray-600'
							>
								{'Gender'}
							</th>
							<th
								key={'h-birth'}
								className='px-2 text-start bg-gray-200 text-gray-600'
							>
								{'Birthday'}
							</th>
							<th
								key={'h-hire'}
								className='px-2 text-start bg-gray-200 text-gray-600 whitespace-nowrap'
							>
								{'Hire Date'}
							</th>
							{/* <th
								key={'h-edit'}
								className='px-2 text-start bg-gray-200 text-gray-600'
							>
								{'Editar'}
							</th>
							<th
								key={'h-delete'}
								className='rounded-r-lg px-2 text-start bg-gray-200 text-gray-600'
							>
								{'Eliminar'}
							</th> */}
						</tr>
					</thead>
					<tbody>
						{employees.length > 0 ? (
							employees.map((employee, index) => {
								return (
									<tr key={index} className=''>
										<td className='px-2 pt-2'>
											{employee.name}
										</td>
										<td className={``}>
											<div
												className={`flex justify-center rounded-lg mx-4 ${
													employee.gender === 'male'
														? 'bg-[#c8e5ff] text-[#2986cc]'
														: 'bg-[#fbcfe3] text-[#c90076]'
												}`}
											>
												{employee.gender}
											</div>
										</td>
										<td className='px-2 pt-2'>
											{employee.birthday}
										</td>
										<td className='px-2 pt-2'>
											{employee.hireDate}
										</td>
										{/* <td className='px-2 pt-2'>
											<button className='bg-gray-400 rounded-lg px-3 py-2 text-white cursor-not-allowed'>
												{'Edit'}
											</button>
										</td>
										<td className='px-2 pt-2'>
											<button className='bg-red-400 rounded-lg px-3 py-2 text-white cursor-not-allowed'>
												{'Delete'}
											</button>
										</td> */}
									</tr>
								);
							})
						) : (
							<>
								<tr>
									<td className='h-[10%]'> </td>
								</tr>
							</>
						)}
					</tbody>
				</table>
			</div>
			{employees.length === 0 && (
				<div className='flex w-full h-auto justify-center my-8 text-gray-400'>
					{'Empty table'}
				</div>
			)}
		</div>
	);
}

export default ListEmployee;
