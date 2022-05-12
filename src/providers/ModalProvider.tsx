import React, { useContext, useState, createContext } from 'react';

const ModalContext = createContext({
	hideModal: null,
	showModal: null,
	props: null,
	component: null,
});

export const ModalConsumer = ModalContext;

export const useModal = () => {
	const context = useContext(ModalContext);

	if (context === undefined) {
		throw new Error('ModalContext cannot be used outside of ModalProvider');
	}
	return context;
};

export const ModalProvider = ({ children }) => {
	const [state, setState] = useState({ component: null, props: null });

	function showModal(component, props = {}) {
		setState({ component, props });
	}

	function hideModal() {
		setState({ component: null, props: {} });
	}

	const contextValue = {
		showModal,
		hideModal,
		...state,
	};

	return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
