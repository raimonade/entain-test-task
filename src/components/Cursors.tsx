import useMousePosition from '@/hooks/useMousePosition';
import ClientCursorData from '@/models/clientCursorData';
import { useConnect } from '@/providers/ConnectProvider';
import { useStore } from '@/store/appStore';
import React, { memo, useEffect } from 'react';
import Cursor from './Cursor';
import shallow from 'zustand/shallow';

const Cursors = () => {
	const { socketRef } = useConnect();
	const { cursors, updateCursor } = useStore(
		(state) => ({
			cursors: state.cursors,
			updateCursor: state.updateCursor,
		}),
		shallow
	);
	const { x, y } = useMousePosition();
	useEffect(() => {
		if (socketRef.current) {
			const element = { coords: { x, y }, socketId: socketRef.current.id };
			socketRef.current.emit('onMouseUpdate', element);
		}
	}, [socketRef.current, x, y]);

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.on('onmouseupdate', (cursor: ClientCursorData) => {
				if (cursor) {
					updateCursor(cursor);
				}
				// setUserList(userList);
			});
		}
	}, [socketRef.current]);

	return (
		<div style={{ zIndex: 1 }}>
			{cursors?.map((cursor: any, i) => {
				// return <Cursor key={cursor.socketId} content={cursor} />;
				return <Cursor key={i} content={cursor} />;
			})}
		</div>
	);
};

export default memo(Cursors);
