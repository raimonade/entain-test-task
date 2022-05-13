import React, { useState, memo, useMemo, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, useSpring } from 'framer-motion';
// import { useOnClickOutside } from 'usehooks-ts';
import { useStore } from '@/store/appStore';
import { usePersistentStore } from '@/store/persistentstore';
import { ReactComponent as TrashIcon } from '@/assets/trash.svg';
// import { useConnect } from '@/providers/ConnectProvider';
import { User } from '@/components/UserList';
// import useMousePosition from '@/hooks/useMousePosition';

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

const NoteContainer = styled.div<{ bg: string; fg: string; isOwner: boolean }>`
	position: absolute;
	background: ${(props) => props.bg};
	color: ${(props) => props.fg};
	margin: 20px;
	border-radius: 10px;
	cursor: ${(props) => (!props.isOwner ? 'not-allowed' : 'pointer')};
	/* border: 1px solid #00ff00; */
	/* border: 1px solid #ffd700; */
	border: ${(props) => (!props.isOwner ? 'none' : '3px solid' + props.theme.color.text)};
	opacity: ${(props) => (props.isOwner ? 1 : 0.75)};
`;

const AnimatedNote = motion(NoteContainer);

const DeleteButton = styled.button`
	position: absolute;
	bottom: 10px;
	left: 10px;
	width: 32px;
	height: 32px;
	background: none;
	pointer: cursor;
	border: none;
	background: rgba(23, 23, 23, 0.5);
	border-radius: 5px;
	padding: 2px;
	z-index: 20;
	svg {
		path {
			fill: white;
		}
	}
`;

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
	right: 0px;
	bottom: 5px;
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

const Note = ({ content, onNoteUpdate, onNoteRemove = null }) => {
	const ref = useRef(null);
	const { user } = usePersistentStore();
	// const isOwner = Math.random() > 0.5;
	const isOwner = content?.owner === user.username;
	// const name = 'Rai';
	// const normalizedName = name.length > 20 ? name.slice(0, 17) + '...' : name;
	const [toggle, setToggle] = useState(isOwner ? false : true);
	const { setFocused, userList } = useStore();
	const [contents, setContents] = useState(content?.text);
	const config = {
		duration: 0.3,
	};
	const x = useSpring(0, config);
	const y = useSpring(0, config);
	const userData = useMemo(
		() => userList?.find((useritem) => useritem._name === content?.owner),
		[content, userList]
	);
	// const { x: mouseX, y: mouseY } = useMousePosition();
	useEffect(() => {
		// setPos([content?.position?.x, content?.position?.y]);
		x.set(content?.position?.x);
		y.set(content?.position?.y);
		setContents(content?.text);
		console.log(content.position);
	}, [content.position]);
	useEffect(() => {
		setContents(content?.text);
	}, [content.text]);

	// useOnClickOutside(ref, () => {
	// 	setToggle(true);
	// 	// setFocused(false);
	// 	onNoteUpdate({
	// 		...content,
	// 		position: {
	// 			x: x.get(),
	// 			y: y.get(),
	// 		},
	// 		text: contents,
	// 	});
	// });

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
	// 	console.log('isOwner', isOwnerName);
	// 	console.log('focused', focused);
	// 	console.log('onNoteCreate', onNoteCreate);

	// 	// setUserList(userList);
	// }, [isOwnerName, pos, colors, contents, user, focused, onNoteCreate]);

	return (
		<AnimatedNote
			drag={isOwner && toggle}
			dragMomentum={false}
			// initial={{
			// 	x: pos[0] - 20,
			// 	y: pos[1] - 40,
			// }}
			dragListener={false}
			whileDrag={{
				scale: 1.07,
				zIndex: 2,
			}}
			style={{
				zIndex: isOwner ? 1 : 0,
				x,
				y,
			}}
			whileTap={
				isOwner && toggle
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
				// cheating with position
				x.set(info?.point?.x - 100 - 40);
				y.set(info?.point?.y - 100 - 40);
				// setPos([x, y]);
				onNoteUpdate({
					...content,
					position: {
						x: x.get(),
						y: y.get(),
					},
					text: contents,
				});
			}}
			// @ts-ignore
			onDragEnd={(event, info) => {
				x.set(info?.point?.x - 100 - 40);
				y.set(info?.point?.y - 100 - 40);
				onNoteUpdate({
					...content,
					position: {
						x: x.get(),
						y: y.get(),
					},
					text: contents,
				});
			}}
			// transition={{ duration: 0.2 }}
			bg={content?.colors?.bgColor}
			fg={content?.colors?.fgColor}
			isOwner={isOwner}
		>
			<NoteWrapper>
				<Toast>
					<User content={userData} />
				</Toast>

				<Text style={{ fontSize: fontSize }}>
					{toggle ? (
						<p
							onDoubleClick={() => {
								if (isOwner) {
									setToggle(false);
									setFocused(true);
								}
							}}
						>
							{contents?.length > 220 ? contents?.slice(0, 220) + '...' : contents}
						</p>
					) : (
						<>
							<TextInput
								ref={ref}
								onKeyUp={() => {
									onNoteUpdate({
										...content,
										position: {
											x: x.get(),
											y: y.get(),
										},
										text: contents,
									});
								}}
								onChange={(event) => {
									if (event.target.value.length < 220) {
										setContents(event.target.value);
										// onNoteUpdate({
										// 	...content,
										// 	position: {
										// 		x: x.get(),
										// 		y: y.get(),
										// 	},
										// 	text: contents,
										// });
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
									}
								}}
								onBlur={() => {
									setToggle(true);
									// setFocused(false);
									onNoteUpdate({
										...content,
										position: {
											x: x.get(),
											y: y.get(),
										},
										text: contents,
									});
								}}
								value={contents}
								style={{ resize: 'none', width: '100%', height: '100%' }}
								autoFocus={isOwner}
								onFocus={() => {
									setFocused(true);
								}}
							/>
						</>
					)}
				</Text>
				{/* yeah so the event handling on framer motion is dogshit */}
				{/* I should have used other module for this, but oh well */}
				{/* {onNoteRemove && isOwner && (
					<DeleteButton
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onNoteRemove(content.id);
						}}
					>
						<TrashIcon />
					</DeleteButton>
				)} */}
			</NoteWrapper>
		</AnimatedNote>
	);
};

export default memo(Note);
// export default Note;
