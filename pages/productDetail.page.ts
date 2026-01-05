import { Locator, Page } from "@playwright/test";

export class ProductDetails {
    readonly page:Page;
    readonly productContainer: Locator;
    readonly backToProductsButton: Locator;

    constructor( page:Page ){
        this.page = page;
        this.backToProductsButton = page.getByRole("button", { name: "Back to products" });
        this.productContainer = page.getByTestId("inventory-item");
    }

    async getProductName(productName:string) : Promise<string> {
        const name = await this.productContainer
        .filter({ hasText: productName })
        .getByTestId("inventory-item-name")
        .textContent();

        if(!name){
            throw new Error(`Product name not found for product : "${productName}"`);
        }

        return name;
    }

    async getProductPrice(productName:string) : Promise<string> {
        const price = await this.productContainer
        .filter({ hasText: productName })
        .getByTestId("inventory-item-price")
        .textContent();

        if(!price){
            throw new Error(`Product name not found for product : "${productName}"`);
        }

        return price ?? "";
    }

    async removeProductFromCart(productName:string) : Promise<void> {
        await this.productContainer.getByRole("button", { name: "Remove" }).click();
    }

    async goBackToProductsPage() : Promise<void> {
        await this.backToProductsButton.click();
    }
}
