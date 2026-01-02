import { Locator, Page } from "@playwright/test";

export class completePage{
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
}
