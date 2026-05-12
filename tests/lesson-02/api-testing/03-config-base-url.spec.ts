import { test, expect } from '@playwright/test';

test.describe('API testing', async () => {
    test('GET /todos.php — lấy toàn bộ danh sách todo — config', async ({ request }) => {
        const response = await request.get('todos.php');

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);


        expect(body.success).toBe(true);
        expect(body.todos).toBeInstanceOf(Object);
    });
});