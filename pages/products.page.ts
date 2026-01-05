import { Locator, Page } from "@playwright/test";

export class Products {
    readonly page: Page;
    readonly productsHeading: Locator;
    readonly productContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeading = page.getByTestId('title')
        this.productContainer = page.getByTestId('inventory-item');
    }

    async goTo(): Promise<void> {
        await this.page.goto("/inventory.html");
    }

    async getProductName(productName: string): Promise<string> {
        const name = await this.productContainer.filter({ hasText: productName }).textContent();
        if (!name) {
            throw new Error(`Product name not found on inventory page for product: "${productName}"`)
        }
        if (Number.isNaN(name)) {
            throw new Error(`Invalid price format for the product: "${productName}"`);
        }
        return name ?? "";
    }

    async getProductPriceByName(productName: string): Promise<string> {
        const priceText = await this.productContainer
            .filter({ hasText: productName })
            .getByTestId('inventory-item-price')
            .textContent();

        if (!priceText) {
            throw new Error(`Price is not found for product: "${productName}"`)
        }

        // const price = Number(priceText.replace(/[^0-9.]/g, ""));

        if (Number.isNaN(priceText)) {
            throw new Error(`Invalid price format: "${priceText}"`)
        }

        return priceText;
    }

    async addProductToCart(productName: string): Promise<void> {
        const addToCartButton = this.productContainer
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' });

        await addToCartButton.click();
    }

    async removeProductFromCart(productName: string): Promise<void> {
        const removeButton = this.productContainer
            .filter({ hasText: productName })
            .getByRole("button", { name: "Remove" });
        await removeButton.click();
    }

}
