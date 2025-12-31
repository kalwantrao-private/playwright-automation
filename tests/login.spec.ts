import { test, expect } from '../fixtures/login.fixture';
import {standardUser, userData} from '../test-data/loginData.ts';

for (const testData of userData) {
    test(`Login with user ${testData.username}`, async ({ loginPage }) => {
        await loginPage.openLoginPage();
      await loginPage.login(testData.username, testData.password);
    });
  }

test.describe("Login page tests", () => {
        test("Login with valid data", { tag: ["@Smoke", "@LoginPage"] }, async ({ loginPage, productsPage }) => {
        // Arrange
        await loginPage.openLoginPage();
        // Act
        await loginPage.login(standardUser.username, standardUser.password);
        // Assert
        await expect(productsPage.productsHeading).toBeVisible();
    });

    test('Login with locked out user', { tag: [ "@LoginTest", "@Regression" ] }, async ({ loginPage }) => {
        // Arrange 
        await loginPage.openLoginPage();
        await loginPage.login(userData[1].username, userData[1].password);
        //Assert 
        const errorText = await loginPage.errorMessageText.textContent();
        expect(errorText).toEqual("Epic sadface: Sorry, this user has been locked out.");
    });

    test('Login with invalid data', { tag: [ "@LoginTest", "@Regression" ] }, async ({ loginPage }) => {
        // Arrange
        await loginPage.openLoginPage();
        // Act
        await loginPage.login(userData[2].username, userData[2].password);
        // Assert
        const errorText = await loginPage.errorMessageText.textContent();
        expect(errorText).toEqual("Epic sadface: Username and password do not match any user in this service");
    });
});
