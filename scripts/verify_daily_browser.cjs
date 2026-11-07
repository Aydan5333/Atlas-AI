// Run with both local servers available. Browser configuration is test-only.
const { chromium } = require(process.env.ATLAS_PLAYWRIGHT || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  const token = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8').match(/^ATLAS_ACCESS_TOKEN=(.+)$/m)?.[1];
  if (!token) throw Error('Local setup required');
  const browser = await chromium.launch({headless:true, ...(process.env.ATLAS_CHROMIUM ? {executablePath:process.env.ATLAS_CHROMIUM,args:['--no-sandbox','--disable-dev-shm-usage','--no-zygote','--single-process','--disable-gpu']} : {})});
  const ctx = await browser.newContext({viewport:{width:390,height:844}});
  const page = await ctx.newPage();
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  const base='http://127.0.0.1:3000/api/atlas'; const created=[]; const day='2099-01-22';
  try {
    assert.equal((await ctx.request.get(`${base}/daily/${day}`)).status(),401);
    await page.goto('http://127.0.0.1:3000/today');
    await page.getByLabel('Access token').fill(token);
    await page.getByRole('button',{name:'Unlock Atlas',exact:true}).click();
    await page.getByLabel('Plan date').waitFor();
    await page.getByLabel('Plan date').fill(day);
    await page.getByRole('button',{name:'Read briefing aloud',exact:true}).waitFor();
    const title=`Daily browser task ${Date.now()}`;
    await page.getByLabel('Quick task',{exact:true}).fill(title);
    await page.getByRole('button',{name:'Add task for this date',exact:true}).click();
    const choice=page.getByRole('checkbox',{name:new RegExp(title)}); await choice.waitFor();
    const records=(await (await ctx.request.get(`${base}/workspace/items`)).json()).items;
    created.push(records.find(r=>r.title===title).id);
    await choice.check();
    await page.getByLabel('Commitments / appointments').fill('Manual appointment at 10 AM');
    await page.getByLabel('Evening review').fill('Verified a complete daily workflow.');
    await page.getByRole('button',{name:'Save daily plan',exact:true}).click();
    await page.getByText('Daily plan and review saved.',{exact:true}).waitFor();
    await page.reload();
    await page.getByLabel('Plan date').fill(day);
    await page.getByRole('checkbox',{name:new RegExp(title)}).waitFor();
    assert.equal(await page.getByLabel('Evening review').inputValue(),'Verified a complete daily workflow.');
    const card=page.locator('article').filter({has:page.getByRole('heading',{name:title,exact:true})}).first();
    await card.getByRole('button',{name:'Complete',exact:true}).click();
    await card.getByRole('button',{name:'Reopen',exact:true}).waitFor();
    // Stub speech only to validate the button wiring; real audible output needs a device check.
    await page.evaluate(()=>{window.speechSynthesis.speak=u=>{window.__spoken=u.text;u.onend?.();};});
    await page.getByRole('button',{name:'Read briefing aloud',exact:true}).click();
    assert.match(await page.evaluate(()=>window.__spoken),/Manual appointment at 10 AM/);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    if(process.env.ATLAS_SCREENSHOT_DIR) await page.screenshot({path:process.env.ATLAS_SCREENSHOT_DIR+'/atlas-today-mobile.png',fullPage:true});
    await page.goto('http://127.0.0.1:3000/business');
    const project=`TSC browser pilot ${Date.now()}`;
    await page.getByLabel('Business project name').fill(project);
    await page.getByLabel('What are we selling?').fill('Example paid pilot for verification');
    await page.getByLabel('What have we proved?').fill('No actual sales; test data only.');
    await page.getByLabel('Next concrete action').fill('Cost the example pilot');
    await page.getByRole('button',{name:'Save blueprint',exact:true}).click();
    await page.getByRole('button',{name:`Open ${project}`,exact:true}).waitFor();
    const saved=(await (await ctx.request.get(`${base}/workspace/items`)).json()).items.find(r=>r.title===project);
    created.push(saved.id);
    await page.getByRole('button',{name:'Add saved next action to tasks',exact:true}).click();
    await page.getByText('Next action saved as a linked TSC task. Choose it on Today when ready.',{exact:true}).waitFor();
    await page.getByRole('button',{name:'Add saved next action to tasks',exact:true}).click();
    await page.getByText('That next action is already an open linked task.',{exact:true}).waitFor();
    const linked=(await (await ctx.request.get(`${base}/workspace/items`)).json()).items.filter(r=>r.project_id===saved.id);
    assert.equal(linked.length,1);created.push(linked[0].id);
    await page.reload();await page.getByRole('button',{name:`Open ${project}`,exact:true}).click();
    assert.equal(await page.getByLabel('What have we proved?').inputValue(),'No actual sales; test data only.');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    if(process.env.ATLAS_SCREENSHOT_DIR) await page.screenshot({path:process.env.ATLAS_SCREENSHOT_DIR+'/atlas-business-mobile.png',fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    if(process.env.ATLAS_SCREENSHOT_DIR) await page.screenshot({path:process.env.ATLAS_SCREENSHOT_DIR+'/atlas-business-desktop.png',fullPage:true});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.deepEqual(errors,[]);
    console.log('PASS: mobile daily plan save/reload/review, task completion, speech-button wiring, blueprint save/reload, linked-task deduplication, access denial; mobile/desktop overflow absent. Actual audio and OS wake delivery are unverified.');
  } finally {
    // Restore the empty test day before deleting its tasks; never touch real records.
    await ctx.request.put(`${base}/daily/${day}`,{data:{focus_ids:[],commitments:'',review:''}});
    for(const id of created.reverse()) await ctx.request.delete(`${base}/workspace/items/${id}`);
    await browser.close();
  }
})().catch(e=>{console.error(e);process.exit(1);});
