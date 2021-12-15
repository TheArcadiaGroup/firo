module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			screens: {
				sm: '480px',
				md: '768px',
				lg: '976px',
				xl: '1440px',
				xxl: '2000px',
				xxxl: '3000px'
			},
			maxWidth: {
				fourk: '2500px'
			},
			fontFamily: {
				sans: ['Source Sans Pro'],
				dmsans: ['DM Sans', 'sans-serif']
			},
			colors: {
				...require('tailwindcss/defaultTheme').colors,
				white: 'white',
				transparent: 'transparent',
				maincolor: '#9B1C2E',
				subtext: '#B1B5C3',
				greytext: '#888888',
				'para-color': 'rgba(136, 136, 136, 0.7)',
				'line-color': '#E6E8EC',
				'bg-primary': '#EDF1F5',
				black: {
					default: '#000000',
					light: '#000000B3',
					lighter: '#00000099',
					lightest: '#00000080'
				}
			},
			borderRadius: {
				mobile: '2rem'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
