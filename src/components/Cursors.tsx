import { useConnect } from '@/providers/ConnectProvider';
import React, { useEffect } from 'react';

const Cursors = () => {
	const { socketRef } = useConnect();

	useEffect(() => {
		if (socketRef.current) {
			// socketRef.current.emit('onMouseUpdate', element);
		}
	}, [socketRef.current]);

	return <div>Cursors</div>;
};

export default Cursors;
