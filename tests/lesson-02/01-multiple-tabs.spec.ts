import { test, expect } from "@playwright/test";

test.describe("Example tests", async () => {
    test("Has title", async ({ context, browser }) => {
        const tab1 = await context.newPage();
        const tab2 = await context.newPage();

        await tab1.goto("https://google.com");
        await tab2.goto("https://youtube.com");
    })

    // Get toàn bộ danh sách
    test('GET /todos.php — lấy toàn bộ danh sách todo', async ({ request }) => {
        const response = await request.get('https://material.playwrightvn.com/api/todo-app/v1/todos.php', {
            params: {
                id: 91,
                name: "Phong",
                status: "Pending"
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body.success).toBe(true);
    });

    // Tạo mới danh sách
    test('POST /todos.php — Tạo mới 1 danh sách', async ({ request }) => {
        const testData = {
            bodyCreated: {
                title: 'Học Playwright API Testing By Khanh',
                status: 'pending',
                priority: 'high',
            }
        }

        const response = await request.post('https://material.playwrightvn.com/api/todo-app/v1/todo.php', {
            data: testData.bodyCreated
        });

        expect(response.status()).toBe(201);
        const body = await response.json();

        expect(body.success).toBe(true);
        expect(body.data).toMatchObject({
            id: expect.any(Number),
            title: testData.bodyCreated.title,
            priority: testData.bodyCreated.priority,
        });
    });



})