module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(test).js'],
    collectCoverageFrom: [
        'script.js',
        '!**/node_modules/**',
    ],
};