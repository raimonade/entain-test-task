import useMousePosition from '@/hooks/useMousePosition';
import ClientCursorData from '@/models/clientCursorData';
import { useConnect } from '@/providers/ConnectProvider';
import { useStore } from '@/store/appStore';
import React, { useEffect } from 'react';
import Cursor from './Cursor';

const Cursors = () => {
	const { socketRef } = useConnect();
	const { cursors, updateCursor } = useStore();
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
					console.log('updateCursorPlacement', cursor);
					updateCursor(cursor);
				}

				// setUserList(userList);
			});
		}
	}, [socketRef.current]);

	return (
		<div>
			{cursors?.map((cursor: any) => {
				return <Cursor key={cursor.socketId} content={cursor} />;
			})}
		</div>
	);
};

export default Cursors;
