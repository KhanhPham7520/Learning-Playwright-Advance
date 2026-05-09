import { test, expect } from '@playwright/test';

test.describe("Trang login", () => {

  test('Go to material page', async ({ page }) => {
    await page.goto("https://material.playwrightvn.com/");
    await expect(page).toHaveTitle(/Tài liệu/);
  });

  test('thanh toán đơn hàng', async ({ page }) => {
    await test.step('Thêm sản phẩm vào giỏ', async () => {
      await page.click('#add-to-cart');
    });

    await test.step('Đi đến trang thanh toán', async () => {
      await page.click('#checkout');
    });

    await test.step('Xác nhận đơn hàng', async () => {
      await expect(page.getByText('Đặt hàng thành công')).toBeVisible();
    });
  });

});