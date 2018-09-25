import puppeteer from 'puppeteer';
import { fakeToken } from '../../mock/fakeToken';

describe('Login', () => {
  let browser;
  let page;
  const startUrl = 'http://localhost:8000/login';

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(startUrl, { waitUntil: 'networkidle2' });
  });

  afterEach(() => page.close());

  it('should login with failure', async () => {
    await page.waitForSelector('#email');
    await page.type('#email', 'unknown@email.com');
    await page.type('#password', 'wrong_password');
    await page.click('button[type="submit"]');
    // should display a notification error
    await page.waitForSelector('.ant-notification-notice-icon-error');
  });

  it('should login successfully', async () => {
    await page.waitForSelector('#email');
    await page.type('#email', 'test@obp.com');
    await page.type('#password', 'secretPassword1');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-layout-sider h1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1><span>Metrics Broker</span></h1>');
    const token = await page.evaluate(() =>
      window.localStorage.getItem('metrics-broker-token')
    );
    expect(token).toEqual(fakeToken());
  });

  afterAll(() => browser.close());
});
