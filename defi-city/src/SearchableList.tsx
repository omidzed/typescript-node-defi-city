import { SearchBox } from './SearchBox';
import { AssetsList } from './AssetsList';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { useAssets } from './utils/useAssets';

type SearchableListProps = {
	style: string;
};

export function SearchableList({ style }: SearchableListProps) {
	const [inputValue, setInputValue] = useState('');
	const { assets } = useAssets();

	const filteredAssets = assets.filter(asset =>
		asset.name.toLowerCase().includes(inputValue.toLowerCase()),
	);

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}

	return (
		<div className='justify-between w-2/3 px-8'>
			<SearchBox
				className={style}
				value={inputValue}
				onInputChange={handleInputChange}
			/>
			<AssetsList filteredAssets={filteredAssets} />
		</div>
	);
}
