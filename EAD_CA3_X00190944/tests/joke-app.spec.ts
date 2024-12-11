import { test, expect } from '@playwright/test';

// Button Tests
test('Generate joke button', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('div').filter({ hasText: 'Category Type Joke' }).nth(3)).toBeVisible();
});

test('Clear form button', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.locator('.form-check-input').first().check();
  await page.locator('div:nth-child(2) > .form-check-input').check();
  await page.locator('div:nth-child(3) > .form-check-input').check();
  await page.locator('div:nth-child(4) > .form-check-input').check();
  await page.locator('div:nth-child(5) > .form-check-input').check();
  await page.locator('div:nth-child(6) > .form-check-input').check();
  await page.getByRole('combobox').first().selectOption('FR');
  await page.getByPlaceholder('Enter search term(s)').click();
  await page.getByPlaceholder('Enter search term(s)').fill('test');
  
  await page.getByRole('button', { name: 'Clear Form' }).click();

  await expect(page.locator('.form-check-input').first()).not.toBeChecked();
  await expect(page.locator('div:nth-child(2) > .form-check-input')).not.toBeChecked();
  await expect(page.locator('div:nth-child(3) > .form-check-input')).not.toBeChecked();
  await expect(page.locator('div:nth-child(4) > .form-check-input')).not.toBeChecked();
  await expect(page.locator('div:nth-child(5) > .form-check-input')).not.toBeChecked();
  await expect(page.locator('div:nth-child(6) > .form-check-input')).not.toBeChecked();
  
  await expect(page.getByRole('combobox').first()).toHaveValue('EN');
  await expect(page.getByRole('combobox').nth(1)).toHaveValue('Any');
  await expect(page.getByPlaceholder('Enter search term(s)')).toBeEmpty();

  await expect(page.locator('div').filter({ hasText: 'Category Type Joke' }).nth(3)).not.toBeVisible();
});

// No Joke Found Tests
test('No joke generated', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.locator('.form-check-input').first().check();
  await page.getByPlaceholder('Enter search term(s)').click();
  await page.getByPlaceholder('Enter search term(s)').fill('code');
  
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.getByRole('img', { name: 'No Jokes Found' })).toBeVisible();
  await expect(page.getByText('Sorry, no jokes found')).toBeVisible();
  await expect(page.locator('#main')).toContainText('Sorry, no jokes found');
});

// Categories Tests
test('Christmas category', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.locator('.form-check-input').first().check();
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('tbody')).toContainText('Christmas');
});

test('Dark category', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.locator('div:nth-child(2) > .form-check-input').check();
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('tbody')).toContainText('Dark');
});

test('Misc category', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.locator('div:nth-child(3) > .form-check-input').check();
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('tbody')).toContainText('Misc');
});

test('Programming category', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.locator('div:nth-child(4) > .form-check-input').check();
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('tbody')).toContainText('Programming');
});

test('Pun category', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.locator('div:nth-child(5) > .form-check-input').check();
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('tbody')).toContainText('Pun');
});

test('Spooky category', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.locator('div:nth-child(6) > .form-check-input').check();
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('tbody')).toContainText('Spooky');
});

// Languages Tests
test('English language', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('div').filter({ hasText: 'Category Type Joke' }).nth(3)).toBeVisible();
});

test('Czech language', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('combobox').first().selectOption('CS');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('div').filter({ hasText: 'Category Type Joke' }).nth(3)).toBeVisible();
});

test('Frech language', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('combobox').first().selectOption('FR');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('div').filter({ hasText: 'Category Type Joke' }).nth(3)).toBeVisible();
});

test('German language', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('combobox').first().selectOption('DE');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('div').filter({ hasText: 'Category Type Joke' }).nth(3)).toBeVisible();
});

test('Portuguese language', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('combobox').first().selectOption('PT');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('div').filter({ hasText: 'Category Type Joke' }).nth(3)).toBeVisible();
});

test('Spanish language', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('combobox').first().selectOption('ES');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('div').filter({ hasText: 'Category Type Joke' }).nth(3)).toBeVisible();
});

// Joke Type Tests
test('Single joke type', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('combobox').nth(1).selectOption('Single');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('tbody')).toContainText('single');
});

test('Two-part joke type', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('combobox').nth(1).selectOption('TwoPart');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('tbody')).toContainText('twopart');
});

// Search Box Tests
test('Search box', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByPlaceholder('Enter search term(s)').click();
  await page.getByPlaceholder('Enter search term(s)').fill('code');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await expect(page.locator('tbody')).toContainText('code');
});

// Quantity Tests
test('Quantity one joke', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('3');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await page.getByText('3').click();
});

test('Quantity ten joke enable go to next page', async ({ page }) => {
  await page.goto('http://localhost:5027/');

  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('10');
  await page.getByRole('button', { name: 'Generate Joke' }).click();
  await page.getByLabel('Go to next page').click();
  await expect(page.locator('div').filter({ hasText: 'Category Type Joke' }).nth(3)).toBeVisible();
});