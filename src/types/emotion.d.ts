// import '@emotion/react';

// declare module '@emotion/react' {
// 	export interface Theme {
// 		colors: {
// 			primary: string;
// 			darkIndigo: string;
// 			paleGray: string;
// 			background: string;
// 			text: string;
// 		};
// 	}
// }

import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme extends Record<string, any> {}
}
