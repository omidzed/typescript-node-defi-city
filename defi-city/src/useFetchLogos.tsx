import { useState, useEffect } from 'react';

const ids = [
	1, 1027, 825, 1839, 52, 5426, 3408, 2010, 74, 1958, 1975, 11419, 5805, 3890, 6636, 4943, 2, 5994,
	1831, 3957, 3794, 7083, 3897, 512, 328, 20396, 2563, 1321, 4157, 3635, 2280, 8916, 8000, 4642,
	21794, 6535, 10603, 27075, 3077, 4687, 11840, 7226, 7278, 6719, 1518, 11841, 4195, 5690, 22861,
	3155, 6892, 4030, 2416, 4847, 2586, 4558, 26081, 1720, 3602, 3513, 6210, 6783, 4172, 1966, 2011,
	1376, 4846, 2087, 1765, 8646, 19891, 11092, 7080, 2634, 20947, 4256, 25028, 23121, 11156, 18876,
	6953, 10791, 23149, 4066, 7653, 7334, 2943, 6538, 5632, 7186, 1785, 1659, 1437, 5176, 5964, 7129,
	20314, 28298, 24478, 11857,
];

export type LogoInfo = {
	id: string;
	name: string;
	logo: string;
};

export function useFetchLogos() {
	const [logos, setLogos] = useState<LogoInfo[] | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>();

	useEffect(() => {
		async function fetchLogos() {
			try {
				const response = await fetch(
					`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?&id=${ids.join(',')}`,
					{
						headers: {
							'X-CMC_PRO_API_KEY': '44f133d8-a055-48f2-a1c2-2cdfa46723f7',
							'skip_invalid': 'true',
							'aux': 'logo',
						},
					},
				);
				if (response.ok) {
					const data = await response.json();
					const fetchedLogos = data.data.map(
						(asset: { id: string; name: string; logo: string }) => ({
							id: asset.id,
							name: asset.name,
							logo: asset.logo,
						}),
					);

					setLogos(fetchedLogos);
					setLoading(false);
					console.log('logos', logos);
				} else {
					throw new Error('Failed to fetch data');
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		fetchLogos();
	}, [logos]);

	return { logos, loading, error };
}
