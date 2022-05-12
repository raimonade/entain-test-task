import React from 'react';
import { useModal } from '@/providers/ModalProvider';
import styled from '@emotion/styled';
import { ReactComponent as Cross } from '@/assets/cross.svg';

const ModalHeader = styled.div`
	display: flex;
	margin-bottom: 12px;
	height: 40px;
	transform: translateX(-2px);
`;

const ModalBody = styled.div`
	position: relative;
	min-height: 150px;
	max-width: 600px;
	width: 80%;
	background-color: #fff;
	border-radius: 10px;
	padding: 25px;
`;
const Button = styled.button`
	all: unset;
	position: absolute;
	top: 0px;
	right: 0px;
	cursor: pointer;
	svg {
		fill: ${({ theme }) => theme.color.text};
		width: 32px;
		height: 32px;
	}
`;
const Heading = styled.h3`
	font-size: 24px;
	font-weight: 600;
`;

const Modal = ({ children, title = 'Welcome' }) => {
	const { hideModal } = useModal();
	return (
		<ModalBody>
			<ModalHeader>
				<Heading>{title}</Heading>
				<Button onClick={hideModal}>
					<Cross />
				</Button>
			</ModalHeader>
			{children}
		</ModalBody>
	);
};

export default Modal;
