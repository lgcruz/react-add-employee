import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<div className='flex items-center bg-white'>
				<img
					src='/Hyla-USA.png'
					alt='logo'
					className='w-auto h-10 mx-6'
				/>
				<nav className='flex'>
					<ul className='flex'>
						<li className='p-6'>
							<Link to='/'>{'Home'}</Link>
						</li>
						<li className='p-6'>
							<Link to='/employees'>{'Employees'}</Link>
						</li>
					</ul>
				</nav>
			</div>
			<Outlet />
		</>
	);
};

export default Layout;
