import { Locator, Page } from "@playwright/test";
import { error } from "node:console";

export class Overview {
    readonly page: Page;
    readonly overviewText: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly checkoutSummary: Locator;
    readonly productContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.overviewText = page.getByTestId("title").filter({ hasText: "Checkout: Overview" });
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
        this.finishButton = page.getByRole("button", { name: "Finish" });
        this.productContainer = page.getByTestId("inventory-item");
        this.checkoutSummary = page.getByTestId("checkout-summary-container");
    }

    async getProductName(productName: string): Promise<string> {
        const prodName = await this.productContainer.filter({ hasText: productName }).getByTestId("inventory-item-name").textContent();
        return prodName ?? "";
    }

    async clickFinishButton(): Promise<void> {
        await this.finishButton.click();
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

    async getPaymentInformationText() : Promise<string> {
        const text = await this.checkoutSummary.getByTestId("payment-info-label").textContent();
        return text ?? "";
    }

    async getShippingInformationText(): Promise<string> {
        const text = await this.checkoutSummary.getByTestId("shipping-info-label").textContent();
        return text ?? "";
    }

    async getPriceTotatText() : Promise<string> {
        const text = await this.checkoutSummary.getByTestId("total-info-label").textContent();
        return text ?? "";
    }


    async getItemTotal() : Promise<number> {
        const priceText = await this.checkoutSummary.getByTestId("subtotal-label").textContent();

        if(!priceText){
            throw new Error("price not found");
        }

        const price = Number(priceText.replace(/[^0-9.]/g, ""));

        if(Number.isNaN(price)){
            throw new Error("Invalid price format");
        }

        return price;
    }

    async getTax() : Promise<number> {
        const taxText = await this.checkoutSummary.getByTestId("tax-label").textContent();

        if(!taxText){
            throw new Error("Tax value is not found");
        }

        const tax = Number(taxText.replace(/[^0-9]/g, ""));
        if(Number.isNaN(tax)){
            throw new Error("Invalid format for tax");
        }
        return tax;
    }

    async getFinalTotal() : Promise<number> {
        const finalTotalText = await this.checkoutSummary.getByTestId("total-label").textContent();
        if(!finalTotalText){
            throw new Error("Final total price not found");
        }
        const finalTotal = Number(finalTotalText.replace(/[^0-9]/g, ""));

        if(Number.isNaN(finalTotal)){
            throw new Error("Invali format of total price");
        }
        return finalTotal;
    }


}
