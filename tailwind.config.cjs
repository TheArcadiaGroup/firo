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
				xl: '1440px'
			},
			fontFamily: {
				sans: ['Source Sans Pro']
			},
			colors: {
				...require('tailwindcss/defaultTheme').colors,
				white: 'white',
				transparent: 'transparent',
				maincolor: '#9B1C2E',
				subtext: '#B1B5C3',
				'para-color': 'rgba(136, 136, 136, 0.7)',
				'line-color': '#E6E8EC',
				'bg-primary': '#EDF1F5',
				black: {
					default: '#000000',
					light: 'rgba(0,0,0,0,0.7)',
					lighter: 'rgba(0,0,0,0,0.6)',
					lightest: 'rgba(0,0,0,0,0.5)'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
