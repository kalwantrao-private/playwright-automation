import{ test as setup, expect} from '@playwright/test';
import  { STORAGE_PATH } from '../playwright.config';

setup("Login setup", async ({page})=>{
    await page.goto("https://www.saucedemo.com");
    const usernameTextbox = page.getByRole('textbox',{name: 'Username'});
    const passwordTextbox = page.getByRole('textbox', {name : 'Password'});
    const loginButton = page.getByRole('button', {name: 'Login'});

    await usernameTextbox.fill('standard_user');
    await passwordTextbox.fill('secret_sauce');
    await loginButton.click();

    await page.context().storageState({path: STORAGE_PATH });

})