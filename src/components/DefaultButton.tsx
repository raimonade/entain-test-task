import { postitColors } from '@/styles/colors';
import { contrast } from '@/utils/accessible-color';
import styled from '@emotion/styled';
import React from 'react';

const Button = styled.button<{ color: string; textColor: string }>`
	background-color: ${(props) => props.color};
	border-radius: 8px;
	border-style: none;
	box-sizing: border-box;
	color: #ffffff;
	cursor: pointer;
	display: inline-block;
	font-size: 14px;
	font-weight: 500;
	height: 40px;
	line-height: 20px;
	list-style: none;
	margin: 0;
	outline: none;
	padding: 10px 16px;
	position: relative;
	text-align: center;
	text-decoration: none;
	transition: color 100ms;
	vertical-align: baseline;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	transition: opacity 100ms;
	opacity: 1;
	color: ${(props) => props.textColor};

	&:hover,
	&:focus {
		opacity: 0.8;
	}
`;

const DefaultButton = ({
	className = '',
	color = postitColors.tropicalYellow,
	text,
	action = null,
	type = null,
}) => {
	const textColor = contrast(color);
	return (
		<Button
			className={className}
			role="button"
			color={color}
			textColor={textColor}
			onClick={action}
			type={type}
		>
			{text}
		</Button>
	);
};

export default DefaultButton;
