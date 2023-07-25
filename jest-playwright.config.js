module.exports = {
	browsers: ["chromium"],
	devices: [
		// 'iPhone SE',
		// 'iPad Pro 11',
		// 'iPad Mini',
		// 'iPhone XR',
		// 'iPhone X',
		// 'iPhone 6',
		// 'iPhone 7 Plus',
		// 'Pixel 3',
		// {
		//     name: 'iPhone 12 Pro',
		//     viewport: {
		//         width: 390,
		//         height: 844,
		//     },
		//     userAgent:
		//         'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
		//     deviceScaleFactor: 3,
		//     isMobile: true,
		//     hasTouch: true,
		//     defaultBrowserType: 'webkit',
		// },
		{
			name: "Pixel 4",
			userAgent:
				"Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.42 Mobile Safari/537.36",
			viewport: {
				width: 353,
				height: 745,
			},
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			defaultBrowserType: "chromium",
		},

		// {
		//     name: 'Huawei P20 Lite',
		//     viewport: {
		//         width: 360,
		//         height: 760,
		//     },
		//     userAgent:
		//         'Mozilla/5.0 (Linux; Android 5.0; Huawei P10 Lite Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4576.0 Mobile Safari/537.36',
		//     deviceScaleFactor: 1,
		//     isMobile: true,
		//     hasTouch: true,
		//     defaultBrowserType: 'chromium',
		// },
		// {
		//     name: 'Xiaomi Redmi Note 8 Pro',
		//     viewport: {
		//         width: 393,
		//         height: 851,
		//     },
		//     userAgent:
		//         'Mozilla/5.0 (Linux; Android 5.0; Xiaomi Redmi Note 8 Pro Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4576.0 Mobile Safari/537.36',
		//     deviceScaleFactor: 1,
		//     isMobile: true,
		//     hasTouch: true,
		//     defaultBrowserType: 'chromium',
		// },
		// {
		//     name: 'Xiaomi POCO F2 Pro',
		//     viewport: {
		//         width: 393,
		//         height: 873,
		//     },
		//     userAgent:
		//         'Mozilla/5.0 (Linux; Android 5.0; Xiaomi POCO X3 Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4576.0 Mobile Safari/537.36',
		//     deviceScaleFactor: 1,
		//     isMobile: true,
		//     hasTouch: true,
		//     defaultBrowserType: 'chromium',
		// },
		// {
		//     name: 'Samsung A10+',
		//     viewport: {
		//         width: 412,
		//         height: 869,
		//     },
		//     userAgent:
		//         'Mozilla/5.0 (Linux; Android 5.0; Samsung A51 Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4576.0 Mobile Safari/537.36',
		//     deviceScaleFactor: 1,
		//     isMobile: true,
		//     hasTouch: true,
		//     defaultBrowserType: 'chromium',
		// },
		// {
		//     name: 'Samsung Tab S6',
		//     viewport: {
		//         width: 712,
		//         height: 1138,
		//     },
		//     userAgent:
		//         'Mozilla/5.0 (Linux; Android 5.0; Samsung Note 8 Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4576.0 Mobile Safari/537.36',
		//     deviceScaleFactor: 1,
		//     isMobile: true,
		//     hasTouch: true,
		//     defaultBrowserType: 'chromium',
		// },
	],

	launchType: "LAUNCH",
	userDataDir: "",
	launchOptions: {
		headless: true,
		args: ["--disable-web-security"],
	},

	// useDefaultBrowserType: true,
	// contextOptions: {
	//     recordVideo: {
	//         dir: 'videos/',
	//     },
	// },
}
