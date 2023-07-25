import { Browser, Page } from 'playwright'

declare global {
    const browser: Browser
    const page: Page
    const browserName: string
    const deviceName: string
}