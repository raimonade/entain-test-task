import Colors from './colors';

export default interface ClientUser {
	_name: string;
	_socketId: string;
	colors: Colors;
}
