// import { useConnect } from '@/providers/ConnectProvider';
import { useModal } from '@/providers/ModalProvider';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import DefaultButton from './DefaultButton';
import { useStore } from '@/store/appStore';
import axios from 'axios';
import { usePersistentStore } from '@/store/persistentstore';

const Label = styled.label`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	/* align-items: center; */
	font-size: 16px;
	font-weight: 300;
	color: #59596b;
`;

const Container = styled.div``;
const LabelContainer = styled.div`
	position: relative;
`;

const Input = styled.input`
	/* margin-left: 20px; */
	height: 30px;
	width: 100%;
	border-radius: 5px;
	border: 1px solid lightgray;
	padding: 0 10px;
	width: calc(100% - 20px);
`;

const ErrorLabel = styled.div`
	position: absolute;
	bottom: -20px;
	margin-top: 10px;
	display: flex;
	color: red;
	font-size: 12px;
`;
const SmallText = styled.div`
	margin-top: 5px;
	margin-bottom: 10px;
	display: flex;
	color: gray;
	font-size: 13px;
`;

const ButtonWrapper = styled.div`
	height: 40px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	margin-top: 20px;
`;

const ModalContent = (props) => {
	console.log(props);
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
			.post(`/api/register/${username.toString()}`)
			.catch((e) => {
				console.error('FAILED REGISTRATION:', e);
				setError(
					'server',
					'Failed to connect to the server, I dont have a fix, try resetting the page'
				);
				return;
			})
			.then(() => {
				updateUser('username', username);
				setError('server', null);
			});
	};

	return (
		<Container>
			<Label htmlFor="">
				<LabelContainer>
					<span>Username</span>
					<SmallText>Please choose a username between 3 and 20 characters</SmallText>
					<Input
						autoFocus={true}
						onKeyDown={(e) => {
							if (
								errors.username ||
								errors.server ||
								username.length > 20 ||
								username.length < 3
							) {
								return;
							}
							if (e.keyCode == 13) {
								handleSubmit();
							}
						}}
						onChange={(e) => {
							e.preventDefault();
							setError('username', null);
							if (e.target.value.length > 20) {
								setError('username', 'Username must be at most 20 characters');
								return;
							}
							setUsername(e.target.value);
						}}
						value={username}
					/>
					<ErrorLabel>{errors?.username && errors.username}</ErrorLabel>
					<ErrorLabel>{errors?.server && errors.server}</ErrorLabel>
				</LabelContainer>
			</Label>
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
		showModal(ModalContent, { onSubmit: login });
	}, [user.username]);

	const register = async (username) => {
		console.log('REGISTERING USER:', username);

		await axios
			.post(`/api/register/${username}`)
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
