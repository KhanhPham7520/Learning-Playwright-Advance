import { test, expect, APIRequestContext } from "@playwright/test";
import { title } from "node:process";


type CreateTodoBody = {
  title: string,
  status: 'pending' | 'completed',
  priority: 'low' | 'medium' | 'high'
}


export class TodoApiPage {

  request: APIRequestContext;
  baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async getTodos() {
    const response = await this.request.get(`${this.baseUrl}/todos.php`);
    expect(response.status()).toBe(200);

    return response.json();
  }


  async createTodo(body: CreateTodoBody) {
    const response = await this.request.post(`${this.baseUrl}/todos.php`, {
      data: body
    });
    expect(response.status()).toBe(201);
    return response.json();
  }
}


test.describe("Authenticated API", async () => {
  test('Authenticated API - with POM', async ({ request }) => {
    const todoApiPage = new TodoApiPage(request, "https://material.playwrightvn.com/api/todo-app/v1");

    await test.step("To do", async () => {
      const response = await todoApiPage.getTodos();
    })
  });

  // with POM
  test('POST /todo.php có POM', async ({ request }) => {
    const todoApiPage = new TodoApiPage(request, "https://material.playwrightvn.com/api/todo-app/v1");
    const testData = {
      title: "Phong demo lesson 02",
      status: "completed",
      priority: "low"
    }

    await test.step("Tạo mới todo", async () => {
      const response = await todoApiPage.createTodo({
        title: testData.title,
        status: 'completed',
        priority: 'low'
      });

      console.log(response);

      expect(response.todo).toMatchObject({
        id: expect.any(Number),
        title: response.title,
        status: testData.status,
        priority: response.priority
      })
    })
  });

});