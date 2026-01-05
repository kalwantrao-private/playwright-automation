import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly yourCartText: Locator;
    readonly cartProductContainer: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.yourCartText = page.getByTestId("title");
        this.cartProductContainer = page.getByTestId("inventory-item");
        this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
        this.checkoutButton = page.getByRole("button", { name: 'Checkout' });
    }

    async goTo(): Promise<void> {
        await this.page.goto("/cart.html");
    }

    async getProductName(productName: string): Promise<string> {
        const name = await this.cartProductContainer
        .filter({ hasText: productName })
        .getByTestId("inventory-item-name").textContent();

        if(!name){
            throw new Error(`Price not found for product: "${productName}"`);
        }

        return name;
    }

    async getProductQty(productName: string): Promise<number> {
        const count = await this.cartProductContainer.filter({ hasText: productName }).getByTestId("item-quantity").textContent();

        return parseInt(count!);
    }

    async getNumberOfCartItems(): Promise<number> {
        const count = await this.cartProductContainer.count();
        return count ?? 0;
    }

    async goToProductsPageFromCart(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async getProductPrice(productName: string): Promise<string> {
        const price = await this.cartProductContainer
        .filter({ hasText: productName })
        .getByTestId('inventory-item-price')
        .textContent();

        if (!price) {
            throw new Error(`Price not found for product: "${productName}"`)
        }

        // const price = Number(priceText.replace(/[^0-9.]/g, ""));

        if (Number.isNaN(price)) {
            throw new Error(`Invalid price format for the given product: "${productName}"`)
        }
        return price;
    }

    async goToCheckoutPage(): Promise<void> {
        await this.checkoutButton.click();
    }

    async removeProductFromCart(prodName:string) : Promise<void> {
        await this.cartProductContainer
        .filter({ hasText: prodName })
        .getByRole('button', {name: "Remove"})
        .click();
    }

    async checkProductDetailsBeforeCheckout( productName: string) : Promise<void> {
        await this.cartProductContainer
        .filter({ hasText: productName })
        .getByTestId("inventory-item-name").click();
    }
}
