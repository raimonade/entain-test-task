import React from 'react';
import styled from '@emotion/styled';

import { ModalConsumer } from '@/providers/ModalProvider';
import Modal from './Modal';

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	z-index: 100;
	background-color: ${({ theme }) => theme.color.modalBackground};
	opacity: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalWrapper = () => {
	return (
		<ModalConsumer.Consumer>
			{({ component: Component, props, hideModal }) =>
				Component && (
					<Wrapper>
						<Modal>
							<Component {...props} onRequestClose={hideModal} />
						</Modal>
					</Wrapper>
				)
			}
		</ModalConsumer.Consumer>
	);
};

export default ModalWrapper;
