module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production' ? {
            'postcss-combine-duplicated-selectors': {},
            'cssnano': {
                preset: ['default', {
                    discardComments: { removeAll: true },
                    normalizeWhitespace: true,
                    mergeLonghand: true
                }]
            }
        } : {})
    }
}
