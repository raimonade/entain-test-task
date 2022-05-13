import styled from '@emotion/styled';
import React from 'react';

const Dots = styled.div`
	background-image: url(./dot.png);
	background-color: ${(props) => props.theme.color.canvasBackground};
	background-position: -2px -2px;
	background-size: 10px 10px;
	bottom: 0;
	height: 100%;
	left: 0;
	opacity: 1;
	pointer-events: none;
	position: fixed;
	right: 0;
	top: 0;
	transition: opacity 0.6s linear;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	width: 100%;
	z-index: 1;
`;

const DotGrid = () => {
	return <Dots />;
};

export default DotGrid;
