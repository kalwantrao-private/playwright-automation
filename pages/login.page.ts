import { Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;
    readonly errorMessageText: Locator;

    constructor(page: Page){
        this.page=page;
        this.usernameTextbox = page.getByRole('textbox',{name: 'Username'});
        this.passwordTextbox = page.getByRole('textbox', {name : 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.errorMessageText = page.getByRole('heading', {level: 3}); 
    }

    async openLoginPage() : Promise<void>{
        await this.page.goto("/");
    }

    async login(username: string, password: string) : Promise<void>{
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }
    
}