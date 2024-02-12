import { createContext, FC, ReactNode } from 'react';
import type { AssetDisplay } from './useFetchAssets';
import { useFetchAssets } from './useFetchAssets';
import { LogoInfo, useFetchLogos } from './useFetchLogos';

export type AssetsContextValues = {
	assets: AssetDisplay[];
	logos: LogoInfo[] | undefined;
	loading: boolean;
	error: unknown;
};

export const AssetsContext = createContext<AssetsContextValues>({
	assets: [],
	logos: [],
	loading: true,
	error: null,
});

export const AssetsProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { assets, loading, error } = useFetchAssets();
	const { logos } = useFetchLogos();
	return (
		<AssetsContext.Provider value={{ assets, logos, loading, error }}>
			{children}
		</AssetsContext.Provider>
	);
};
