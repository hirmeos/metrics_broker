import puppeteer from 'puppeteer';
import { fakeToken } from '../../mock/fakeToken';

describe('Work Add Form', () => {
  let browser;
  let page;
  const startUrl = 'http://localhost:8000/publications/add';
  const token = fakeToken();

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // standard viewpoint doesn't fully cover #new-title-btn, so puppeteer
    // doesn't properly trigger title tests.
    page.setViewport({ width: 1920, height: 1080 });
    await page.goto(startUrl, { waitUntil: 'networkidle2' });
    await page.evaluate(t => {
      window.localStorage.setItem('metrics-broker-token', t);
    }, token);
    await page.evaluate(() =>
      window.localStorage.setItem('metrics-broker-authority', 'admin')
    );
    await page.goto(startUrl, { waitUntil: 'networkidle0' });
  });

  afterEach(() => page.close());

  it('should render publication type select', async () => {
    await page.waitForSelector('#type-card');
    await page.waitForSelector('#type');
    await page.click('#type');
    await page.waitForSelector('#monograph');
    await page.click('#monograph');
    await page.waitForSelector('[title="monograph"]');
  });

  it('should add title', async () => {
    await page.waitForSelector('#title-card');
    await page.waitForSelector('#new-title-btn');
    await page.click('#new-title-btn');
    await page.waitForSelector('#title-TITLE_ID_0');
    await page.type('#title-TITLE_ID_0', 'New Book Title');
    await page.click('#save-title-btn-TITLE_ID_0');
    await page.waitForSelector('#edit-title-btn-TITLE_ID_0');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('New Book Title');
  });

  it('should add uri', async () => {
    await page.waitForSelector('#uri-card');
    await page.waitForSelector('#new-uri-btn');
    await page.click('#new-uri-btn');
    await page.waitForSelector('#uri-URI_ID_0');
    await page.type('#uri-URI_ID_0', 'info:doi:10.11647/obp.0001');
    await page.click('#save-uri-btn-URI_ID_0');
    await page.waitForSelector('#edit-uri-btn-URI_ID_0');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('info:doi:10.11647/obp.0001');
    expect(text).toContain('>No</td>'); // non canonical
  });

  it('should add canonical uri', async () => {
    await page.waitForSelector('#uri-card');
    await page.waitForSelector('#new-uri-btn');
    await page.click('#new-uri-btn');
    await page.waitForSelector('#uri-URI_ID_0');
    await page.type('#uri-URI_ID_0', 'info:doi:10.11647/obp.0001');
    await page.click('#uri-canonical-URI_ID_0');
    await page.click('#save-uri-btn-URI_ID_0');
    await page.waitForSelector('#edit-uri-btn-URI_ID_0');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('info:doi:10.11647/obp.0001');
    expect(text).toContain('>Yes</td>');
  });

  it('should add multiple titles', async () => {
    await page.waitForSelector('#title-card');
    await page.waitForSelector('#new-title-btn');
    await page.click('#new-title-btn');
    await page.waitForSelector('#title-TITLE_ID_0');
    await page.type('#title-TITLE_ID_0', 'New book title 1');
    await page.click('#save-title-btn-TITLE_ID_0');
    await page.waitForSelector('#edit-title-btn-TITLE_ID_0');
    await page.click('#new-title-btn');
    await page.waitForSelector('#title-TITLE_ID_1');
    await page.type('#title-TITLE_ID_1', 'New book title 2');
    await page.click('#save-title-btn-TITLE_ID_1');
    await page.waitForSelector('#edit-title-btn-TITLE_ID_1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('New book title 1</td>');
    expect(text).toContain('New book title 2</td>');
  });

  it('should add multiple uris', async () => {
    await page.waitForSelector('#uri-card');
    await page.waitForSelector('#new-uri-btn');
    await page.click('#new-uri-btn');
    await page.waitForSelector('#uri-URI_ID_0');
    await page.type('#uri-URI_ID_0', 'info:doi:10.11647/obp.0001');
    await page.click('#save-uri-btn-URI_ID_0');
    await page.waitForSelector('#edit-uri-btn-URI_ID_0');
    await page.click('#new-uri-btn');
    await page.waitForSelector('#uri-URI_ID_1');
    await page.type('#uri-URI_ID_1', 'info:doi:10.11647/obp.0002');
    await page.click('#uri-canonical-URI_ID_1');
    await page.click('#save-uri-btn-URI_ID_1');
    await page.waitForSelector('#edit-uri-btn-URI_ID_1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('info:doi:10.11647/obp.0001');
    expect(text).toContain('info:doi:10.11647/obp.0001');
    expect(text).toContain('>No</td>');
    expect(text).toContain('>Yes</td>');
  });

  it('should not submit empty form', async () => {
    await page.waitForSelector('#form-submit-btn');
    await page.click('#form-submit-btn');
    await page.waitForSelector('#errors-icon');
  });

  it('should submit form', async () => {
    // make sure cards are rendered
    await page.waitForSelector('#type-card');
    await page.waitForSelector('#title-card');
    await page.waitForSelector('#uri-card');
    // select type
    await page.waitForSelector('#type');
    await page.click('#type');
    await page.waitForSelector('#monograph');
    await page.click('#monograph');
    await page.waitForSelector('[title="monograph"]');
    // add title
    await page.waitForSelector('#new-title-btn');
    await page.click('#new-title-btn');
    await page.waitForSelector('#title-TITLE_ID_0');
    await page.type('#title-TITLE_ID_0', 'New Book Title');
    await page.click('#save-title-btn-TITLE_ID_0');
    await page.waitForSelector('#edit-title-btn-TITLE_ID_0');
    // add uri
    await page.waitForSelector('#new-uri-btn');
    await page.click('#new-uri-btn');
    await page.waitForSelector('#uri-URI_ID_0');
    await page.type('#uri-URI_ID_0', 'info:doi:10.11647/obp.0001');
    await page.click('#save-uri-btn-URI_ID_0');
    await page.waitForSelector('#edit-uri-btn-URI_ID_0');
    // submit
    await page.waitForSelector('#form-submit-btn');
    await page.click('#form-submit-btn');
    // check notification
    await page.waitForSelector('.ant-message-success');
  });

  afterAll(() => browser.close());
});
