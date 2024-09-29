import { test, expect } from "@playwright/test";

test("webpp deve estar online", async ({ page }) => {
  await page.goto("http://192.168.1.17:5555");
  await expect(page).toHaveTitle("Gerencie suas tarefas com Mark L");
  await page.waitForTimeout(3000);

  //   await page.click('xpath=//button[contains(text(), "Create")]');
  //   await inputTaskName.fill("Ler um livro de typescript");
  //   await inputTaskName.press("Enter");
  //   await page.fill('input[class*=InputNewTask]', 'Ler um livro de typescript');
  //   await page.fill("#newTask", "Ler um livro de typescript");
  //   await page.fill(
  //     'input[placeholder="Add a new Task"]',
  //     "Ler um livro de typescript"
  //   );
  //   await page.fill("input[type=text]", "Ler um livro de typescript");
  //   await page.fill("._listInputNewTask_1y0mp_21", "Ler um livro de typescript");
});
