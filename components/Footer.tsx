import React from 'react'

const Footer = () => {
	return (
		<footer className='absolute bottom-0 inset-x-0 w-screen px-4 py-2 text-white bg-blue-700'>
			<div className='container flex flex-wrap items-center justify-center w-full h-auto mx-auto sm:justify-between'>
			<div className='flex items-center p-1 text-lg text-center rounded-md sm:text-right hover:bg-indigo-400'>
					Hecho con
					{``}
					<span role='img' aria-label='heart'> 💗 </span>
					<a href='mailto:fiorellabissi@hotmail.com'>por Fiorella Bissi</a>
				</div>
				<div>
					<a href='mailto:fiorellabissi@hotmail.com'>fiorellabissi@hotmail.com</a>
				</div>
			</div>
			</footer>
	)
}

export default Footer
