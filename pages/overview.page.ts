import { Locator, Page } from "@playwright/test";

export class overview {
    readonly page: Page;
    readonly overviewText: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly productContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.overviewText = page.getByTestId("title").filter({ hasText: "Checkout: Overview" });
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
        this.finishButton = page.getByRole("button", { name: "Finish" });
        this.productContainer = page.getByTestId("inventory-item");
    }

    async getProductName(productName: string): Promise<string> {
        const prodName = await this.productContainer.filter({ hasText: productName }).getByTestId("inventory-item-name").textContent();
        return prodName ?? "";
    }

    async getProductPrice(productName: string): Promise<string> {
        const priceText = await this.productContainer
            .filter({ hasText: productName })
            .getByTestId("inventory-item-price")
            .textContent();

        if (!priceText) {
            throw new Error(`Price not found for product: "${productName}"`);
        }
        // const price = Number(priceText.replace(/[^0-9.]/g, ""));

        if (Number.isNaN(priceText)) {
            throw new Error(`Invalid price format: "${priceText}"`)
        }
        return priceText ?? 0;
    }

    async submitOrder() : Promise<void> {
        await this.finishButton.click();
    }

    async cancelOrder() : Promise<void> {
        await this.cancelButton.click();
    }
}
