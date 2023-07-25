module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    roots: ['./test'],
    testMatch: ['**/?(*.)+(spec|test).[t]s'],
    testPathIgnorePatterns: ['/node_modules/', 'dist'],
    testTimeout: 120000,
    transform: { '^.+\\.ts?$': 'ts-jest' },
    // testEnvironmentOptions: {
    //     'jest-playwright': {
    //         browsers: ['chromium'],
    //         devices: ['iPhone 11 Pro'],
    //     },
    // },
}
