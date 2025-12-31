import { Locator, Page } from "@playwright/test";

export class cartPage{
    readonly page: Page;
    readonly yourCartText: Locator;
    readonly cartProductContainer: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page:Page){
        this.page=page;
        this.yourCartText = page.getByTestId("title");
        this.cartProductContainer = page.getByTestId("inventory-item");
        this.continueShoppingButton = page.getByRole("button", {name: "Continue Shopping"});
        this.checkoutButton = page.getByRole("button", { name: 'Checkout'});
    }

    async goTo() : Promise<void>{
        await this.page.goto("/cart.html");
    }
    
    async getProductName(productName: string) : Promise<string>{
        const name = await this.cartProductContainer.filter({ hasText : productName }).getByTestId("inventory-item-name").textContent();
        return name!;
    }

    async getProductQty(productName: string) : Promise<number> {
        const count = await this.cartProductContainer.filter({ hasText: productName}).getByTestId("item-quantity").textContent();

        return parseInt(count!);
    }

    async getProductPrice(productName:string) : Promise<string>{
        const price =await this.cartProductContainer.filter({ hasText: productName }).getByTestId('inventory-item-price').textContent();
        return price!
    }
}