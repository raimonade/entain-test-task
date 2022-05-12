import React from 'react';
import styled from '@emotion/styled';
import { postitColors } from '@/styles/colors';
import { contrast } from '@/utils/accessible-color';
import { motion } from 'framer-motion';

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
	margin: 1em;
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

const Note = () => {
	const bg =
		Object.values(postitColors)[Math.floor(Math.random() * Object.values(postitColors).length)];
	const fg = contrast(bg);
	const owner = Math.random() > 0.5;
	const name = 'Rai';
	const text = `				placeholdertextplaceholdertextplaceholdertextplaceholdertext
	placeholdertextplaceholdertextplaceholdertextplaceholdertext
	placeholdertextplaceholdertextplaceholdertextplaceholdertext
	placeholdertextplaceholdertextplaceholdertextplaceholdertext
	placeholdertextplaceholdertextplaceholdertextplaceholdertext`;
	const normalizedName = name.length > 20 ? name.slice(0, 17) + '...' : name;
	const normalizedText = text.length > 260 ? text.slice(0, 260) + '...' : text;

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
	const fontSize = downscale(text.length, 260, 34, 16);

	return (
		<AnimatedNote
			drag={owner}
			dragMomentum={false}
			initial={{
				x: 1000 * Math.random(),
				y: 1000 * Math.random(),
			}}
			whileDrag={{
				scale: 1.1,
				zIndex: 2,
			}}
			style={{
				zIndex: owner ? 1 : 0,
			}}
			whileTap={{
				opacity: 1,
				scale: 1.05,
				boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.2)',
			}}
			transition={{ duration: 0.3 }}
			bg={bg}
			fg={fg}
			owner={owner}
		>
			<NoteWrapper>
				<Toast color={fg}>
					{/* {owner.toString()} */}
					{normalizedName}
				</Toast>

				<Text style={{ fontSize: fontSize }}>{normalizedText}</Text>
			</NoteWrapper>
		</AnimatedNote>
	);
};

export default Note;
