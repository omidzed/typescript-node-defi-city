import { ChangeEvent, useState } from 'react';

type SearchBoxProps = {
	value: string;
	onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
	className: string;
};
export function SearchBox({ value, onInputChange }: SearchBoxProps) {
	const [placeholder, setPlaceholder] = useState('Search...');

	function handleClick() {
		setPlaceholder('');
	}

	function handleBlur() {
		setPlaceholder('Search...');
	}

	return (
		<div className='flex justify-center p-2 '>
			<input
				className=' p-2 pl-4 bg-slate-200 border border-black rounded-md w-1/4'
				id='myTextarea'
				placeholder={placeholder}
				onClick={handleClick}
				onBlur={handleBlur}
				value={value}
				onChange={onInputChange}></input>
		</div>
	);
}
