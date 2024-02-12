import { SearchableList } from './SearchableList';
import { AssetsProvider } from './AssetsContext';
import { useState } from 'react';

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	const style = 'text-yellow-300';

	return (
		<div className={`${darkMode && 'dark'}`}>
			<div className='dark:bg-black'>
				<button
					onClick={toggleDarkMode}
					className='border-2 px-6 py-2 bg-slate-800 dark:bg-slate-400 border-black
					 text-yellow-300 dark:text-blue-900'>
					dark
				</button>
			</div>
			<AssetsProvider>
				<SearchableList style={style} />
			</AssetsProvider>
		</div>
	);
}

export default App;
