import { globalStyles } from '../styles/base';
import MainLayout from '@/components/layouts/main';

import type { AppProps } from 'next/app';
import { ModalProvider } from '@/providers/ModalProvider';
import { ConnectProvider } from '@/providers/ConnectProvider';
import ModalWrapper from '@/components/ModalWrapper';
import Navbar from '@/components/Navbar';
import SignupModal from '@/components/SignupModal';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{globalStyles}
			<ConnectProvider>
				<ModalProvider>
					<MainLayout>
						<ModalWrapper />
						<SignupModal />
						<Navbar />

						<Component {...pageProps} />
					</MainLayout>
				</ModalProvider>
			</ConnectProvider>
		</>
	);
}
