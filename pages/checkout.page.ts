import { Locator, Page } from "@playwright/test";

export class checkout{
    readonly page:Page;
    readonly checkoutPageText: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;
    readonly errorButton: Locator;

    constructor(page:Page) {
        this.page=page;
        this.checkoutPageText=page.getByTestId("title").filter({ hasText: "Checkout: Your Information" });
        this.firstName=page.getByTestId("firstName");
        this.lastName=page.getByTestId("lastName");
        this.postalCode=page.getByTestId("postalCode");
        this.cancelButton=page.getByRole('button', { name: 'Cancel'} );
        this.continueButton=page.getByTestId("continue");
        this.errorMessage=page.getByRole('heading', { level: 3});
        this.errorButton=page.getByTestId('error-button');
    }

    async fillUserInfo(fname:string, lname:string, postalCode:string) : Promise<void>{
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.postalCode.fill(postalCode);
    }

    async clickContinueButton(): Promise<void>{
        await this.continueButton.click();
    }

    async clickCancelButton(): Promise<void> {
        await this.cancelButton.click();
    }

    async errorMessageText(): Promise<String>{
        const errorText = await this.errorMessage.textContent();

        if(!errorText){
            throw new Error(`Error message not found :`)
        }

        return errorText ?? "";
    }
}
