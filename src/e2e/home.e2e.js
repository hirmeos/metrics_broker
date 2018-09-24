import puppeteer from 'puppeteer';

describe('Homepage', () => {
  let browser;
  let page;
  const startUrl = 'http://localhost:8000';

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(startUrl, { waitUntil: 'networkidle2' });
  });

  afterEach(() => page.close());

  it('should redirect to login', async () => {
    expect(page.url()).toContain('login');
  });

  it('should have logo text', async () => {
    await page.waitForSelector('#email');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<span>Metrics Broker</span>');
  });

  afterAll(() => browser.close());
});
