/*
Assignment: PATCH and DELETE API Automation

Objective:
1. Login using a valid student account.
2. Update the student's password using the PATCH API.
3. Delete the student using the DELETE API.
4. Verify the response status codes and response messages.
*/

import { test, expect } from '@playwright/test';

test('Login, PATCH and DELETE request', async ({ request }) => {

    // Login
    const loginResponse = await request.post(
        'https://qa.taltektc.com/api/login',
        {
            headers: {
                'Content-Type': 'application/json',
                'api_token': 'DevGF4sg665s4ggFddfdgdgFFrs54D87sr54afggsTTC'
            },
            data: {
                id: 'TTC0141',
                password: '123456'
            }
        }
    );

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    expect(loginBody.message).toBe('Successfully signed in');

    const accessToken = loginBody.access_token;
    const studentId = loginBody.student_id;

    // Patch Password
    const patchResponse = await request.patch(
        `https://qa.taltektc.com/api/updatePassword/${studentId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'api_token': 'DevGF4sg665s4ggFddfdgdgFFrs54D87sr54afggsTTC',
                'Authorization': `Bearer ${accessToken}`,
                'access_token': accessToken
            },
            data: {
                password: 'UpdatedPas$1',
                confirmPassword: 'UpdatedPas$1'
            }
        }
    );

    expect(patchResponse.status()).toBe(200);

    const patchBody = await patchResponse.json();

    expect(patchBody.success).toBe(true);
    expect(patchBody.message).toContain('Password updated successfully');

    // Delete Student
    const deleteResponse = await request.delete(
        `https://qa.taltektc.com/api/student/${studentId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'api_token': 'DevGF4sg665s4ggFddfdgdgFFrs54D87sr54afggsTTC',
                'Authorization': `Bearer ${accessToken}`,
                'access_token': accessToken
            }
        }
    );

    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();

    expect(deleteBody.success).toBe(true);
    expect(deleteBody.message).toBe('Student deleted successfully');

});