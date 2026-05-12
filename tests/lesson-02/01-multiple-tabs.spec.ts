import { test, expect } from "@playwright/test";
import { log } from "node:console";
import { request } from "node:http";
import { title } from "node:process";

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

    // PUT - cập nhật toàn bộ
    test('PUT /todos.php — Cập nhật toàn bộ todo', async ({ request }) => {
        const testData = {
            bodyCreated: {
                title: 'Học Playwright API Testing By Khanh',
                status: 'pending',
                priority: 'high',
            },
            bodyUpdated: {
                title: "New title - Modified from Khanh",
                status: "completed"
            }
        }

        let createdId: number = 0;

        // Step 1
        await test.step("Step 1 : Tạo todo", async () => {
            const bodyCreate = testData.bodyCreated;
            const response = await request.post('https://material.playwrightvn.com/api/todo-app/v1/todo.php', {
                data: bodyCreate
            });

            // Verify json trả về 201 sau khi tạo
            expect(response.status()).toBe(201);

            const body = await response.json();
            createdId = body.todo.id;

            console.log("Created id: ", createdId);
        })


        // Step 2
        await test.step("Step 2 : update todo", async () => {
            const bodyUpdated = testData.bodyUpdated;

            const response = await request.put('https://material.playwrightvn.com/api/todo-app/v1/todo.php', {
                data: {
                    ...bodyUpdated,
                    id: createdId
                } // spread operator
            })

            expect(response.status()).toBe(200);
            const body = await response.json();

            expect(body.todo.title).toBe(bodyUpdated.title)
            expect(body.todo.status).toBe(bodyUpdated.status)
        });

        await test.step("Step 3 : Xóa todo đã tạo ra", async () => {
            // Xóa todo
            let response = await request.delete('https://material.playwrightvn.com/api/todo-app/v1/todo.php', {
                data: {
                    id: createdId
                }
            })
            expect(response.status()).toBe(200);

            // Get lai todo
            response = await request.get('https://material.playwrightvn.com/api/todo-app/v1/todos.php', {
                params: {
                    id: createdId
                },
            });
            expect(response.status()).toBe(404);
        })
    });

    test("Test profile endpoint - Get Profile success", async ({ request }) => {
        await test.step("Get profile information", async () => {
            const response = await request.get("https://material.playwrightvn.com/api/user-management/v1/login.php", {
                headers: {
                    //Authorizationn: `Bearer: ${token}`
                }
            })
        })
    })

})