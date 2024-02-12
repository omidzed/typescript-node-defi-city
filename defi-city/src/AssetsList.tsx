import type { AssetDisplay } from './useFetchAssets';
import { GoTriangleDown } from 'react-icons/go';
import { GoTriangleUp } from 'react-icons/go';

type AssetsListProps = {
	filteredAssets: AssetDisplay[];
};

export function AssetsList({ filteredAssets }: AssetsListProps) {
	return (
		<>
			{filteredAssets.length === 0 && <p>Your input does not match the search criteria, please try something different!</p>}
			<ul className='grid grid-cols-4 ml-20 px-10 font-bold gap-8 flex-wrap dark:bg-black dark:text-white'>
				{filteredAssets.map((asset, index) => (
					<li key={asset.id || index}>
						<p>{asset.name}</p>
						<div className={+asset.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}>
							{asset.percentChange}
							{+asset.percentChange >= 0 ? <GoTriangleUp /> : <GoTriangleDown />}
						</div>
						{asset.price}
						{asset.logo}
					</li>
				))}
			</ul>
		</>
	);
}
