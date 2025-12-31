import { Locator, Page } from "@playwright/test";

export class products {
    readonly page: Page;
    readonly productsHeading: Locator;
    readonly productContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeading = page.getByTestId('title')
        this.productContainer = page.getByTestId('inventory-item');
    }

    async goTo() : Promise<void> { 
        await this.page.goto("/inventory.html");
    }

    async getProductName(productName: string): Promise<void> {
        await this.productContainer.filter({ hasText: productName }).textContent();
    }

    async getProductPriceByName(productName: string) : Promise<string> {
        const price = await this.productContainer.filter({ hasText: productName }).getByTestId('inventory-item-price').textContent();

        return price!;
    }

    async addProductToCart(productName: string): Promise<void> {
        const addToCartButton = this.productContainer
        .filter({ hasText: productName })
        .getByRole('button', { name: 'Add to cart' });

        await addToCartButton.click();
    }
}