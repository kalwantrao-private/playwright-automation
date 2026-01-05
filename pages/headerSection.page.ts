import { Locator, Page } from "@playwright/test";


export class Header {
    readonly page: Page;
    readonly hamburgerMenu: Locator;
    readonly swagLabsText: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly logoutLink: Locator;
    readonly closeHamburgerMenu: Locator;

    constructor(page: Page){
        this.page = page;
        this.hamburgerMenu = page.getByRole('button', {name: 'Open Menu'});
        this.swagLabsText = page.getByText('Swag Labs');
        this.shoppingCartLink = page.getByTestId("shopping-cart-link");
        this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
        this.logoutLink = page.getByRole('link', {name: 'Logout'});
        this.closeHamburgerMenu = page.getByRole('button', {name : 'Close Menu'});
    }

    async logout() : Promise<void>{
        await this.logoutLink.click();
    }

    async getNumberOfCartItems() : Promise<number>{
        const totalCartItems =  await this.shoppingCartBadge.textContent();

        return parseInt(totalCartItems!);
    }

    async closeHamburger() : Promise<void>{
        await this.closeHamburgerMenu.click();
    }

    async goToCartPage(): Promise<void>{
        await this.shoppingCartLink.click();
    }

}
