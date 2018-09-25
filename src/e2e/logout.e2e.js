import puppeteer from 'puppeteer';
import { fakeToken } from '../../mock/fakeToken';

describe('Logout', () => {
  let browser;
  let page;
  const startUrl = 'http://localhost:8000/';
  const token = fakeToken();

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(startUrl, { waitUntil: 'networkidle2' });
    await page.evaluate(t => {
      window.localStorage.setItem('metrics-broker-token', t);
    }, token);
    await page.evaluate(() =>
      window.localStorage.setItem('metrics-broker-authority', 'admin')
    );
    await page.goto(startUrl, { waitUntil: 'networkidle2' });
  });

  afterEach(() => page.close());

  it('should logout', async () => {
    await page.waitForSelector('#header-user-name');
    await page.hover('#header-user-name');
    await page.waitForSelector('.anticon-logout');
    await page.click('.anticon-logout');
    const storedToken = await page.evaluate(() =>
      window.localStorage.getItem('metrics-broker-token')
    );
    expect(storedToken).toEqual('undefined');
  });

  it('should redirect to login', async () => {
    await page.waitForSelector('#header-user-name');
    await page.hover('#header-user-name');
    await page.waitForSelector('.anticon-logout');
    await page.click('.anticon-logout');
    await page.waitForSelector('#email');
  });

  afterAll(() => browser.close());
});
