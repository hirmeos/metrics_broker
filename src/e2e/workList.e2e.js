import puppeteer from 'puppeteer';
import { fakeToken } from '../../mock/fakeToken';

describe('Work List', () => {
  let browser;
  let page;
  const startUrl = 'http://localhost:8000/publications/list';
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

  it('should render publications list', async () => {
    await page.waitForSelector('.ant-table-row');
    const rowCount = (await page.$$('tr.ant-table-row')).length;
    expect(rowCount).toEqual(10);
  });

  it('should navigate pagination', async () => {
    await page.waitForSelector('.ant-table-row');
    await page.click('.ant-pagination-item-3');
    const rowCount = (await page.$$('tr.ant-table-row')).length;
    expect(rowCount).toEqual(1);
  });

  it('should search title', async () => {
    await page.waitForSelector('.ant-table-row');
    await page.click('#title-search-icon');
    await page.waitForSelector('#title-search-input');
    await page.type('#title-search-input', 'mathematics');
    await page.click('#title-search-btn');
    await page.waitForSelector('.ant-table-row');
    let rowCount = (await page.$$('tr.ant-table-row')).length;
    expect(rowCount).toEqual(1);
    // now reset
    await page.click('#title-search-icon');
    await page.waitForSelector('#title-search-reset-btn');
    await page.click('#title-search-reset-btn');
    await page.waitForSelector('.ant-table-row');
    rowCount = (await page.$$('tr.ant-table-row')).length;
    expect(rowCount).toEqual(10);
  });

  it('should search URI', async () => {
    await page.waitForSelector('.ant-table-row');
    await page.click('#uri-search-icon');
    await page.waitForSelector('#uri-search-input');
    await page.type('#uri-search-input', 'info:doi:10.11647/obp.0028');
    await page.click('#uri-search-btn');
    await page.waitForSelector('.ant-table-row');
    let rowCount = (await page.$$('tr.ant-table-row')).length;
    expect(rowCount).toEqual(3);
    // now reset
    await page.click('#uri-search-icon');
    await page.waitForSelector('#uri-search-reset-btn');
    await page.click('#uri-search-reset-btn');
    await page.waitForSelector('.ant-table-row');
    rowCount = (await page.$$('tr.ant-table-row')).length;
    expect(rowCount).toEqual(10);
  });

  afterAll(() => browser.close());
});
