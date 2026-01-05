import { Locator, Page } from "@playwright/test";

export class CompletePage{
    readonly page:Page;
    readonly orderCompleteContainer: Locator;


    constructor(page:Page){
        this.page=page;
        this.orderCompleteContainer = page.getByTestId("checkout-complete-container");
    }

    async orderCompleteCheckMarkIsVisible(): Promise<boolean> {
        const symbolVisible = await this.orderCompleteContainer.getByAltText("Pony Express").isVisible();

        return symbolVisible;
    }

    async clickBackHomeButton() : Promise<void> {
        await this.orderCompleteContainer.getByRole("button", { name: "Back Home" }).click();
    }

    async getThankYouForYourOrderText() : Promise<string> {
        const headerText = await this.orderCompleteContainer.getByTestId("complete-header").textContent();

        if(!headerText){
            throw new Error("Header text not found");
        }
        return headerText;
    }

    async getOrderCompleteText(): Promise<string> {
        const text = await this.orderCompleteContainer.getByTestId("complete-text").textContent();

        if(!text){
            throw new Error("Order complete text not found");
        }

        return text;
    }

    async thankYouForYourOrderIsDisplayed() : Promise<boolean> {
        const isDisplayed = await this.orderCompleteContainer.getByTestId("complete-header").isVisible();

        return isDisplayed;
    }

    async orderCompleteTextIsDisplayed() : Promise<boolean> {
        const isDisplayed = await this.orderCompleteContainer.getByTestId("complete-text").isVisible();

        return isDisplayed;
    }

    async backHomeButtonIsDisplayed(): Promise<boolean> {
        const isDisplayed = await this.orderCompleteContainer.getByRole("button", { name: "Back Home" }).isVisible();
        return isDisplayed;
    }
}
