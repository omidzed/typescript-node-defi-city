import { useState, useEffect } from 'react';

type QuoteUSD = {
	price: number;
	market_cap: number;
	volume_24h: number;
	percent_change_24h: number;
};

export type Asset = {
	id: string;
	name: string;
	symbol: string;
	quote: {
		USD: QuoteUSD;
	};
	circulating_supply: number;
};

export type AssetDisplay = {
	name: string;
	price: string;
	symbol: string;
	percentChange: string;
	volume: string;
	marketCap: string;
	circulatingSupply: string;
	id: string;
	logo?: string;
};

export function useFetchAssets() {
	const [assets, setAssets] = useState<AssetDisplay[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>();

	useEffect(() => {
		async function fetchData() {
			try {
				const targetUrl = encodeURIComponent('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest');

				const response = await fetch(`https://lfz-cors.herokuapp.com/?url=${targetUrl}`, {
					headers: {
						'X-CMC_PRO_API_KEY': '44f133d8-a055-48f2-a1c2-2cdfa46723f7',
					},
				});
				if (response.ok) {
					const data = await response.json();
					const formattedData = data.data.map((asset: Asset) => formatAsset(asset));
					setAssets(formattedData);
					setLoading(false);
				} else {
					throw new Error('Failed to fetch data');
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [assets]);

	return { assets, loading, error };
}

function formatAsset(asset: Asset): AssetDisplay {
	const { price, market_cap, volume_24h, percent_change_24h } = asset.quote.USD;
	const formattedPrice = `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
	const formatter = new Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'long',
	});
	return {
		name: asset.name,
		price: formattedPrice,
		symbol: asset.symbol,
		percentChange: formatter.format(percent_change_24h),
		volume: formatter.format(volume_24h),
		marketCap: formatter.format(market_cap),
		circulatingSupply: formatter.format(asset.circulating_supply),
		id: asset.id,
		logo: undefined,
	};
}
