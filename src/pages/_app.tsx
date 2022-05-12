import { globalStyles } from '../styles/base';
import MainLayout from '@/components/layouts/main';

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{globalStyles}
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</>
	);
}
