module.exports = {
	theme: {
		extend: {
			colors: {
				"gray": {
					1000: '#1b1b1b',
					1001: '#969696'
				},
				"orange": {
					1000: '#f90',
					1001: '#ff9f0e'
				},
				"white": {
					1000: '#c6c6c6'
				}
			}
		}
	},
	variants: {
		extend: {},
	},
  plugins: [
    require("daisyui"),
    require('@tailwindcss/aspect-ratio')
  ],
}
