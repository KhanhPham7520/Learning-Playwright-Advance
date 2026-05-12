import { test, expect } from '@playwright/test';

const BASE_URL = 'https://material.playwrightvn.com/api/user-management/v1';

let token: string;
let adminEmail: string;

test.describe('Authenticated API testing', () => {
    test.beforeAll(async ({ request }) => {
        // Reset database để có dữ liệu mẫu
        const resetRes = await request.post(`${BASE_URL}/reset.php`);
        const resetBody = await resetRes.json();

        // Lấy email admin từ dữ liệu mẫu
        const adminAccount = resetBody.reset.sample_data.accounts.find(
            (a: { role: string }) => a.role === 'admin'
        );

        adminEmail = adminAccount.email;

        // Login để lấy token
        const loginRes = await request.post(`${BASE_URL}/login.php`, {
            data: {
                email: adminEmail,
                password: 'password',
            },
        });

        expect(loginRes.status()).toBe(200);

        const loginBody = await loginRes.json();
        token = loginBody.data.token;
    });

    function authHeaders() {
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    test('Get profile', async ({ request }) => {
        const res = await request.get(`${BASE_URL}/profile.php`, {
            headers: authHeaders(),
        });

        expect(res.status()).toBe(200);

        const body = await res.json();

        expect(body.data.email).toBe(adminEmail);
    });

    test('Get users list', async ({ request }) => {
        const res = await request.get(`${BASE_URL}/users.php`, {
            headers: authHeaders(),
        });

        expect(res.status()).toBe(200);

        const body = await res.json();

        expect(Array.isArray(body.data)).toBeTruthy();
    });
});