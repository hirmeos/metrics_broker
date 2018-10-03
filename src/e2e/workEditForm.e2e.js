import puppeteer from 'puppeteer';
import { fakeToken } from '../../mock/fakeToken';

describe('Work Add Form', () => {
  let browser;
  let page;
  const width = 1920;
  const height = 1080;
  const startUrl = 'http://localhost:8000/publications/list';
  const token = fakeToken();

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // standard viewpoint doesn't fully cover #new-title-btn, so puppeteer
    // doesn't properly trigger title tests.
    page.setViewport({ width, height });
    await page.goto(startUrl, { waitUntil: 'networkidle2' });
    await page.evaluate(t => {
      window.localStorage.setItem('metrics-broker-token', t);
    }, token);
    await page.evaluate(() =>
      window.localStorage.setItem('metrics-broker-authority', 'admin')
    );
    await page.goto(startUrl, { waitUntil: 'networkidle0' });
    await page.waitForSelector(
      '#edit-btn-d6b4d2bf-8348-436a-b1a4-5ac1076eac09'
    );
    await page.click('#edit-btn-d6b4d2bf-8348-436a-b1a4-5ac1076eac09');
  });

  afterEach(() => page.close());

  it('should render edit page', async () => {
    expect(page.url()).toContain('/edit/d6b4d2bf-8348-436a-b1a4-5ac1076eac09');
  });

  it('should prepopulate publication type', async () => {
    await page.waitForSelector('#type-card');
    await page.waitForSelector('[title="monograph"]');
  });

  it('should edit title', async () => {
    await page.waitForSelector('#title-card');
    await page.waitForSelector('#edit-title-btn-TITLE_ID_0');
    await page.click('#edit-title-btn-TITLE_ID_0');
    await page.waitForSelector('#title-TITLE_ID_0');
    await page.type('#title-TITLE_ID_0', 'Amended Book Title');
    await page.click('#save-title-btn-TITLE_ID_0');
    await page.waitForSelector('#edit-title-btn-TITLE_ID_0');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('Amended Book Title');
  });

  it('should add extra title', async () => {
    await page.waitForSelector('#title-card');
    await page.waitForSelector('#new-title-btn');
    await page.click('#new-title-btn');
    await page.waitForSelector('#title-TITLE_ID_1');
    await page.type('#title-TITLE_ID_1', 'New Book Title');
    await page.click('#save-title-btn-TITLE_ID_1');
    await page.waitForSelector('#edit-title-btn-TITLE_ID_1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('A Musicology of Performance'); // existing title
    expect(text).toContain('New Book Title');
  });

  it('should add uri', async () => {
    await page.waitForSelector('#uri-card');
    await page.waitForSelector('#new-uri-btn');
    await page.click('#new-uri-btn');
    await page.waitForSelector('#uri-URI_ID_8');
    await page.type('#uri-URI_ID_8', 'info:doi:10.11647/obp.0001');
    await page.click('#save-uri-btn-URI_ID_8');
    await page.waitForSelector('#edit-uri-btn-URI_ID_8');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('info:doi:10.11647/obp.0001');
  });

  it('should edit canonical uri', async () => {
    await page.waitForSelector('#uri-card');
    await page.waitForSelector('#edit-uri-btn-URI_ID_2');
    await page.click('#edit-uri-btn-URI_ID_2');
    await page.waitForSelector('#uri-canonical-URI_ID_2');
    await page.click('#uri-canonical-URI_ID_2');
    await page.click('#save-uri-btn-URI_ID_2');
    await page.waitForSelector('#edit-uri-btn-URI_ID_2');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('info:doi:10.11647/obp.0064');
    expect(text).toContain('>Yes</td>');
  });

  afterAll(() => browser.close());
});
