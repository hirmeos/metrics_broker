import puppeteer from 'puppeteer';
import { fakeToken } from '../../mock/fakeToken';

describe('Dashboard', () => {
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
    await page.evaluate((t) => {
      window.localStorage.setItem('metrics-broker-token', t);
    }, token);
    await page.evaluate(() =>
      window.localStorage.setItem('metrics-broker-authority', 'admin')
    );
    await page.goto(startUrl, { waitUntil: 'networkidle2' });
  });

  afterEach(() => page.close());

  it('should render drivers', async () => {
    expect(page.url()).toContain('dashboard');
    await page.waitForSelector('.ant-card');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<span>2018-09-11 04:05</span>'); // driver date
    expect(text).toContain('>IRUS-UK</div>'); // driver name
    expect(text).toContain('driver-error">Error</span>'); // driver state
  });

  afterAll(() => browser.close());
});
