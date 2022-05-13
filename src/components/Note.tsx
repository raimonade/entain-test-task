import React, { useState, memo, useMemo, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { postitColors } from '@/styles/colors';
import { contrast } from '@/utils/accessible-color';
import { motion } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';
import { useStore } from '@/store/appStore';
import { usePersistentStore } from '@/store/persistentstore';
import { useConnect } from '@/providers/ConnectProvider';

const NoteWrapper = styled.div`
	position: relative;
	flex-shrink: 0;
	max-width: 200px;
	max-height: 200px;
	width: 200px;
	height: 200px;
	padding: 20px;
	padding-bottom: 40px;
	display: flex;
	overflow: hidden;
	font-size: 18px;
`;

const NoteContainer = styled.div<{ bg: string; fg: string; owner: boolean }>`
	position: absolute;
	background: ${(props) => props.bg};
	color: ${(props) => props.fg};
	margin: 20px;
	border-radius: 10px;
	cursor: ${(props) => (!props.owner ? 'not-allowed' : 'pointer')};
	/* border: 1px solid #00ff00; */
	/* border: 1px solid #ffd700; */
	border: ${(props) => (!props.owner ? 'none' : '3px solid' + props.theme.color.text)};

	span {
		opacity: ${(props) => (props.owner ? 1 : 0.5)};
	}
`;

const AnimatedNote = motion(NoteContainer);

const Text = styled.span`
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto;
	word-wrap: break-word;
	width: 100%;
	height: 100%;

	p,
	textarea {
		font-size: inherit;
		width: 100%;
		height: 100%;
	}
`;

const TextInput = styled.textarea`
	background: none;
	border: none;
	transition: all 0.3s ease;
	border-radius: 5px;
	padding: 5px;
	width: calc(100% - 10px);
	box-sizing: border-box;
	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(23, 23, 23, 0.6);
	}
`;

const Toast = styled.span`
	position: absolute;
	position: absolute;
	align-items: center;
	border-radius: 1.5rem;
	display: -ms-flexbox;
	display: flex;
	justify-content: flex-start;
	position: absolute;
	right: 10px;
	bottom: 10px;
	font-size: 15px;
	/* font-weight: bold; */
	font-weight: 500;
	text-align: center;
	margin: 5px 10px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

const Note = ({
	id = null,
	text = '',
	initialX = 0,
	initialY = 0,
	colors = { fgColor: postitColors.default, bgColor: '#000' },
	ownerName = '',
	onNoteCreate,
	onNoteUpdate,
}) => {
	const ref = useRef(null);
	const { socketRef } = useConnect();
	const { user } = usePersistentStore();
	// const owner = Math.random() > 0.5;
	const owner = ownerName === user.username || ownerName === '';
	// const name = 'Rai';
	// const normalizedName = name.length > 20 ? name.slice(0, 17) + '...' : name;
	const [toggle, setToggle] = useState(false);
	const { focused, setFocused } = useStore();
	const [contents, setContents] = useState(text);
	const [pos, setPos] = useState([initialX, initialY]);
	// console.log(colors, 'colors');x
	useOnClickOutside(ref, () => {
		setToggle(true);
		// setFocused(false);
		onConfirm();
	});

	const onConfirm = () => {
		if (!ownerName && onNoteCreate) {
			// 	console.log('EMIT NEW NOTE');
			onNoteCreate(contents, pos[0], pos[1], colors, user);
		}
	};

	function downscale(
		length: number,
		expectedMaxLength: number,
		baseFontSize: number,
		minFontSize: number
	) {
		const scalingFactor = 1 - Math.min((1 / expectedMaxLength) * length, 1);
		return Math.ceil(
			Math.max(scalingFactor * (baseFontSize - minFontSize) + minFontSize, minFontSize)
		);
	}
	const fontSize = useMemo(
		() => (contents?.length > 0 ? downscale(contents?.length, 220, 24, 16) : 14),
		[contents]
	);

	// useEffect(() => {
	// 	console.log('owner', ownerName);
	// 	console.log('focused', focused);
	// 	console.log('onNoteCreate', onNoteCreate);

	// 	// setUserList(userList);
	// }, [ownerName, pos, colors, contents, user, focused, onNoteCreate]);

	return (
		<AnimatedNote
			drag={owner && toggle}
			dragMomentum={false}
			initial={{
				x: initialX - 20,
				y: initialY - 40,
			}}
			whileDrag={{
				scale: 1.07,
				zIndex: 2,
			}}
			style={{
				zIndex: owner ? 1 : 0,
			}}
			whileTap={
				owner && toggle
					? {
							opacity: 1,
							scale: 1.03,
							boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.2)',
					  }
					: null
			}
			// typescript messing up types between motion.div and styled.div
			// so ignoring that shit bc i cba to fix it properly atm
			// @ts-ignore
			onDrag={(event, info) => {
				const x = pos[0] - info.offset.x;
				const y = pos[1] - info.offset.y;
				onNoteUpdate(id, { x, y });
			}}
			// @ts-ignore
			onDragEnd={(event, info) => {
				const x = pos[0] - info.offset.x;
				const y = pos[1] - info.offset.y;
				setPos([x, y]);
			}}
			// transition={{ duration: 0.2 }}
			bg={colors.bgColor}
			fg={colors.fgColor}
			owner={owner}
		>
			<NoteWrapper>
				{/* <Toast color={colors.fgColor}> */}
				{/* {owner.toString()} */}
				{/* {normalizedName} */}
				{/* </Toast> */}

				{/* <Text 
				
				>{normalizedText}</Text> */}
				<Text style={{ fontSize: fontSize }}>
					{toggle ? (
						<p
							onDoubleClick={() => {
								if (owner) {
									setToggle(false);
									setFocused(true);
								}
							}}
						>
							{contents.length > 220 ? contents.slice(0, 220) + '...' : contents}
						</p>
					) : (
						<TextInput
							ref={ref}
							onChange={(event) => {
								if (event.target.value.length < 220) {
									setContents(event.target.value);
								}
							}}
							onKeyDown={(event) => {
								// if (event.keyCode == 13 && event.shiftKey) {
								// 	return;
								// }
								if (event.key === 'Enter' || event.key === 'Escape') {
									setToggle(true);
									setFocused(false);
									event.preventDefault();
									event.stopPropagation();
									onConfirm();
								}
							}}
							value={contents}
							style={{ resize: 'none', width: '100%', height: '100%' }}
							autoFocus={true}
							onFocus={() => {
								setFocused(true);
							}}
						/>
					)}
				</Text>
			</NoteWrapper>
		</AnimatedNote>
	);
};

export default memo(Note);
