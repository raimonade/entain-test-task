import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayer, useHover, Arrow } from 'react-laag';

// const TooltipContainer = motion.div;
const TooltipWrapper = styled(motion.div)`
	z-index: 20;
	font-size: 12px;
	padding: 5px;
	background-color: ${(props) => props.theme.color.text};
	color: ${(props) => props.theme.color.background};
	border-radius: 5px;
	svg {
		path {
			fill: ${(props) => props.theme.color.text};
		}
	}
	pointer-events: none;
`;

export default function Tooltip({ children, content, offsetX = 0, offsetY = 0 }) {
	const [isOver, hoverProps] = useHover();

	const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
		isOpen: isOver,
		placement: 'bottom-center',
	});

	return (
		<>
			<span {...triggerProps} {...hoverProps}>
				{children}
			</span>
			{isOver &&
				renderLayer(
					<AnimatePresence>
						<TooltipWrapper
							{...layerProps}
							initial={{
								opacity: 0,
								scale: 0.8,
								y: -10,
								x: offsetX,
							}}
							animate={{ opacity: 1, scale: 1, y: 0 + offsetY, x: offsetX }}
							exit={{
								opacity: 0,
								scale: 0.8,
								y: -10,
								x: offsetX,
							}}
							transition={{
								type: 'spring',
								damping: 30,
								stiffness: 500,
							}}
						>
							{content}
							<Arrow {...arrowProps} />
						</TooltipWrapper>
					</AnimatePresence>
				)}
		</>
	);
}
