module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
		standardFontWeights: true,
		defaultLineHeights: true,
	},
	purge: {
		enabled: process.env.NODE_ENV === `production` ? true : false,
		content: [
			`./**/*.tsx`,
			`./**/*.jsx`,
		]
	},
	theme: {},
	variants: {},
	plugins: [],
}
