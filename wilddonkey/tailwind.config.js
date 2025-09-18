const path = require('path');
const plugin = require('tailwindcss/plugin');

module.exports = {
    mode: 'jit', // Enable Just-In-Time mode for optimal purging
    content: [
        './**/*.phtml',
        './**/*.html',
        './**/*.js',
        // Hyvä & Magento templates in vendor
        path.resolve(__dirname, '../../../../../vendor/hyva-themes/**/*.{phtml,html,js}'),
        path.resolve(__dirname, '../../../../../vendor/magento/**/*.{phtml,html,js}')
    ],
    safelist: [
        { pattern: /^(sm|md|lg|xl|2xl):?(flex|block|hidden)$/ },
        { pattern: /^(sm|md|lg|xl|2xl):?order-\d+$/ },
        // Ensure primary utilities are kept even if they only appear in vendor templates
        { pattern: /^(hover:)?(focus:)?(text|bg|border|ring)-primary$/ }
    ],
    theme: {
        extend: {
            colors: {
                primary: '#E4672B', // <- burny orange
                donkey: {
                    // Neutrals (paper -> ink)
                    bone:      '#F2EDE3',
                    parchment: '#E7DAC3',
                    dust:      '#9B9084',
                    charcoal:  '#232220',
                    ink:       '#1B1A18',

                    // Coffee browns
                    bean:      '#3D2A22',
                    saddle:    '#7C4E2E',
                    crema:     '#CBB89E',

                    // Brand accents
                    bandana:   '#16A199',
                    sunset:    '#E97B2C',
                    sky:       '#85AFC4',
                    pop:       '#B7E35B',
                }
            },
            fontFamily: {
                heading: ['Bebas Neue', 'system-ui', 'sans-serif'],
                body: ['Inter', 'system-ui', 'sans-serif'],
                accent: ['Caveat', 'cursive'],
            },
            borderRadius: {
                DEFAULT: '0.5rem',
                xl: '1rem',
                '2xl': '1.25rem',
            },
            boxShadow: {
                soft: '0 8px 28px rgba(0,0,0,0.18)',
                inner: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        // Override Hyvä button CSS variables with our brand color
        plugin(({ addComponents, theme }) => {
            const primary = theme('colors.primary');
            addComponents({
                ':root': {
                    '--color-primary': primary,
                },
                '.btn-primary': {
                    '--btn-bg': 'var(--color-primary)',
                    '--btn-color': '#fff',
                    // Slightly darker shades for states
                    '--btn-hover-bg': 'color-mix(in srgb, var(--color-primary) 86%, black)',
                    '--btn-active-bg': 'color-mix(in srgb, var(--color-primary) 70%, black)',
                },
                // Make focus rings match brand by default for .btn
                '.btn': {
                    '--tw-ring-color': 'var(--color-primary)',
                },
            });
        }),
    ],
};
