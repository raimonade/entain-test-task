import { useConnect } from '@/providers/ConnectProvider';
import { useModal } from '@/providers/ModalProvider';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import DefaultButton from './DefaultButton';
import { useStore } from '@/store/appStore';
import axios from 'axios';
import { usePersistentStore } from '@/store/persistentstore';

const Label = styled.label`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	font-weight: 300;
	color: #59596b;
`;

const Container = styled.div``;

const Input = styled.input`
	margin-left: 20px;
	height: 30px;
	width: 100%;
	border-radius: 5px;
	border: 1px solid lightgray;
	padding: 0 10px;
`;

const ErrorLabel = styled.div`
	margin-top: 10px;
	display: flex;
	color: red;
	font-size: 12px;
`;

const ButtonWrapper = styled.div`
	height: 40px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	margin-top: 20px;
`;

const ModalContent = () => {
	const [username, setUsername] = useState('');
	const { hideModal } = useModal();
	const { errors, setError } = useStore();
	const { updateUser } = usePersistentStore();

	const handleSubmit = async () => {
		if (username.length < 3) {
			setError('username', 'Username must be at least 3 characters');
			return;
		}
		setError('username', null);
		await register(username);
		hideModal();
	};

	const register = async (username) => {
		console.log('REGISTERING USER:', username);

		await axios
			.post(`${process.env.API_URL}/api/register/${username}`)
			.catch((e) => {
				console.error('FAILED REGISTRATION:', e);
				return;
			})
			.then(() => {
				updateUser('username', username);
			});
	};

	return (
		<Container>
			<Label htmlFor="">
				<span>Username</span>
				<Input
					onChange={(e) => {
						e.preventDefault();
						setUsername(e.target.value);
					}}
					value={username}
				/>
			</Label>
			<ErrorLabel>{errors?.username && errors.username}</ErrorLabel>
			<ButtonWrapper>
				<DefaultButton action={handleSubmit} text={'Register'} />
			</ButtonWrapper>
		</Container>
	);
};

const SignupModal = () => {
	const { user, updateUser } = usePersistentStore();
	const { hideModal, showModal } = useModal();

	const login = async () => {
		await register(user.username);
		hideModal();
		return;
	};
	// cheaty way, when reseting server can get fucked over
	// so i'm forcing a login regardless
	useEffect(() => {
		console.log(user);
		if (user.username) {
			login();
		}
		showModal(ModalContent);
	}, [user.username]);

	const register = async (username) => {
		console.log('REGISTERING USER:', username);

		await axios
			.post(`${process.env.API_URL}/api/register/${username}`)
			.catch((e) => {
				console.error('FAILED REGISTRATION:', e);
				return;
			})
			.then(() => {
				updateUser('username', username);
			});
	};

	return <></>;
};

export default SignupModal;
