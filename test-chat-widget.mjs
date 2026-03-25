import { chromium } from 'playwright';

const SITE_URL = 'https://automated-agile-portal.lovable.app';
const TIMEOUT = 30000;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let passed = 0;
  let failed = 0;

  function pass(msg) { console.log(`  ✓ ${msg}`); passed++; }
  function fail(msg) { console.log(`  ✗ ${msg}`); failed++; }

  try {
    console.log('\n── Test: Ask this Website chat widget ─────────────────\n');

    // 1. Load the page
    console.log('1. Loading site...');
    await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: TIMEOUT });
    pass('Site loaded');

    // 2. FAB button visible
    console.log('2. Checking for "Ask this website" button...');
    const fab = page.getByRole('button', { name: /ask this website/i });
    await fab.waitFor({ state: 'visible', timeout: TIMEOUT });
    pass('"Ask this website" button is visible');

    // 3. Open the widget
    console.log('3. Clicking the button...');
    await fab.click();
    const panel = page.locator('text=Ask this website').first();
    await panel.waitFor({ state: 'visible', timeout: 5000 });
    pass('Chat panel opened');

    // 4. Suggested questions are shown
    console.log('4. Checking suggested questions...');
    const firstSuggestion = page.getByRole('button', { name: /What are the three primitives/i });
    await firstSuggestion.waitFor({ state: 'visible', timeout: 5000 });
    pass('Suggested questions visible');

    // 5. Click a suggested question
    console.log('5. Clicking suggested question...');
    await firstSuggestion.click();

    // 6. User message appears
    const userMsg = page.locator('text=What are the three primitives?');
    await userMsg.waitFor({ state: 'visible', timeout: 5000 });
    pass('User message displayed');

    // 7. Typing indicator appears
    console.log('6. Waiting for AI response (up to 15s)...');
    await page.waitForTimeout(500);

    // 8. Wait for answer (AI response, no longer answering)
    await page.waitForFunction(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const sendBtn = buttons.find(b => b.getAttribute('aria-label') === 'Send');
      return sendBtn && !sendBtn.disabled;
    }, { timeout: 15000 });
    pass('AI finished responding');

    // 9. Check answer content exists and isn't an error
    const assistantMessages = page.locator('.rounded-2xl.rounded-tl-sm');
    const count = await assistantMessages.count();
    if (count > 0) {
      const answerText = await assistantMessages.first().innerText();
      if (answerText.length > 20 && !answerText.includes('went wrong')) {
        pass(`Answer received: "${answerText.slice(0, 80)}..."`);
      } else {
        fail(`Answer looks wrong: "${answerText}"`);
      }
    } else {
      fail('No assistant message found');
    }

    // 10. Type a custom question
    console.log('7. Typing a custom question...');
    const input = page.getByPlaceholder('Ask a question…');
    await input.fill('What is Decision 7?');
    await page.keyboard.press('Enter');

    await page.waitForFunction(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const sendBtn = buttons.find(b => b.getAttribute('aria-label') === 'Send');
      return sendBtn && !sendBtn.disabled;
    }, { timeout: 15000 });
    pass('Second question answered successfully');

    // 11. Close the widget
    await page.getByRole('button', { name: /close/i }).click();
    await page.waitForTimeout(500);
    const fabAgain = page.getByRole('button', { name: /ask this website/i });
    await fabAgain.waitFor({ state: 'visible', timeout: 3000 });
    pass('Widget closes and FAB reappears');

  } catch (err) {
    fail(`Unexpected error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`\n── Results: ${passed} passed, ${failed} failed ────────────────\n`);
    process.exit(failed > 0 ? 1 : 0);
  }
})();
