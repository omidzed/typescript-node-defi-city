import { useContext } from 'react';
import { AssetsContext } from '../AssetsContext';

export const useAssets = () => {
	return useContext(AssetsContext);
};
