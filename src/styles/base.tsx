import { css, Global, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const globalStyles = (
	<Global
		styles={css`
			html,
			body {
				position: relative;
				display: flex;
				width: 100vw;
				height: 100vh;
				margin: 0;
				min-height: 100%;
				font-family: Helvetica, Arial, sans-serif;
				font-size: 14px;
				/* overflow: hidden; */
				/* overflow-x: auto; */
				/* overflow-y: auto; */
			}

			* {
				margin: 0;
				padding: 0;
				font-family: Helvetica, Arial, sans-serif;
			}

			textarea {
				font-size: 14px;
			}

			#__next {
				position: relative;
				width: 100%;
				height: 100%;
				/* overflow: hidden; */
			}
		`}
	/>
);

export const basicStyles = css`
	background-color: white;
	color: cornflowerblue;
	border: 1px solid lightgreen;
	border-right: none;
	border-bottom: none;
	box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
	transition: all 0.1s linear;
	margin: 3rem 0;
	padding: 1rem 0.5rem;
`;

export const hoverStyles = css`
	&:hover {
		color: white;
		background-color: lightgray;
		border-color: aqua;
		box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
	}
`;
export const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`;

export const Basic = styled.div`
	${basicStyles};
`;

export const Combined = styled.div`
	${basicStyles};
	${hoverStyles};
	& code {
		background-color: linen;
	}
`;
