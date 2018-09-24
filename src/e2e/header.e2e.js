import puppeteer from 'puppeteer';
import { fakeToken } from '../../mock/fakeToken';

describe('Header', () => {
  let browser;
  let page;
  const startUrl = 'http://localhost:8000/dashboard';
  const token = fakeToken();

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(startUrl, { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      window.localStorage.setItem('metrics-broker-token', token);
    }, token);
    await page.evaluate(() =>
      window.localStorage.setItem('metrics-broker-authority', 'admin')
    );
    await page.goto(startUrl, { waitUntil: 'networkidle2' });
  });

  afterEach(() => page.close());

  it('should render user name', async () => {
    await page.waitForSelector(
      '.antd-pro-components-global-header-index-account'
    );
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('>Test User</span>');
  });

  it('should show notification count', async () => {
    await page.waitForSelector('.ant-badge-count');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<p class="current">2</p>'); // should have 2 errors
  });

  afterAll(() => browser.close());
});
