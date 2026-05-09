import { test, expect } from "@playwright/test";

test.describe("Example tests", async () => {
  test('GET /todos.php — lấy toàn bộ danh sách todo', async ({ request }) => {
    const response = await request.get('https://material.playwrightvn.com/api/todo-app/v1/todos.php');
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);

    const respHeader = response.headers();
    console.log(respHeader);
    expect(body.success).toBe(true);
    expect(body.todos).toBeInstanceOf(Object);
  });

  test('GET To Do By Id — Lấy 1 to do cụ thể', async ({ request }) => {
    const response = await request.get('https://material.playwrightvn.com/api/todo-app/v1/todo.php', {
      params: {
        id: 82,

      }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();

    //JSON -> text
    // const rawString = JSON.stringify(body);
    // const parsedJson = JSON.parse(rawString);

    console.log(body);

    const respHeader = response.headers();
    console.log(respHeader);
    expect(body.success).toBe(true);
    expect(body.todos).toBeInstanceOf(Object);
  });


  test('POST /todo.php — tạo todo mới', async ({ request }) => {
    const testData = {
      data: {
        title: 'Học Playwright API Testing',
        status: 'pending',
        priority: 'high',
      },
    };

    const response = await request.post('https://material.playwrightvn.com/api/todo-app/v1/todo.php', {
      data: testData
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.success).toBe(true);


    const bodyCreate = testData
    expect(body.todo).toMatchObject({
      id: expect.any(Number),
      title: testData.data.title,
      priority: testData.data.priority,
    });
  });



});