// Run against local dev servers only; credentials stay in memory and are not logged.
let playwright;
try { playwright = require('../frontend/node_modules/playwright'); }
catch { playwright = require('playwright'); }
const { chromium } = playwright;
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const env = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
  const token = env.match(/^ATLAS_ACCESS_TOKEN=(.+)$/m)?.[1];
  if (!token) throw new Error('Local setup required');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  try {
    const unauthorized = await context.request.get('http://127.0.0.1:3000/api/atlas/workspace/items');
    if (unauthorized.status() !== 401) throw new Error('Private proxy did not reject unauthenticated request');
    await page.goto('http://127.0.0.1:3000/workspace');
    await page.getByLabel('Access token').fill(token);
    await page.getByRole('button', { name: 'Unlock Atlas', exact: true }).click();
    await page.getByLabel('Title', { exact: true }).waitFor();
    const title = `Verification task ${Date.now()}`;
    await page.getByLabel('Title', { exact: true }).fill(title);
    await page.getByLabel('Details / next action').fill('Temporary browser verification record');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await page.getByRole('heading', { name: title, exact: true }).waitFor();
    await page.reload();
    await page.getByRole('heading', { name: title, exact: true }).waitFor();
    const record = page.locator('article').filter({ has: page.getByRole('heading', { name: title, exact: true }) });
    await record.getByRole('button', { name: 'Complete', exact: true }).click();
    await record.getByRole('button', { name: 'Reopen', exact: true }).waitFor();
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error('Mobile horizontal overflow');
    const cookies = await context.cookies();
    const session = cookies.find(c => c.name === 'atlas_session');
    if (!session?.httpOnly || session.sameSite !== 'Strict') throw new Error('Session cookie protections missing');
    page.once('dialog', dialog => dialog.accept());
    await record.getByRole('button', { name: 'Delete', exact: true }).click();
    await page.getByRole('heading', { name: title, exact: true }).waitFor({ state: 'detached' });
    await page.getByRole('button', { name: 'Connections', exact: true }).click();
    await page.getByRole('heading', { name: 'GitHub', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Lock', exact: true }).click();
    await page.getByRole('button', { name: 'Unlock Atlas', exact: true }).waitFor();
    if (errors.length) throw new Error(errors.join('; '));
    console.log('PASS: mobile unlock, save, reload persistence, complete, delete, connector status, lock, unauthorized access, HttpOnly cookie; no browser exceptions');
  } finally { await browser.close(); }
})().catch(err => { console.error(err.message); process.exit(1); });
