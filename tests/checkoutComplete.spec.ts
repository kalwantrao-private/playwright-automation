import { FIRSTNAME, LASTNAME, POSTALCODES, PRODUCT_NAMES } from '../constants/constant';
import {expect, test} from '../fixtures/login.fixture';

test.describe("Order complete page tests", ()=> {
    test("Check on order complete page check mark, thank you text and back home button  is visible", { tag: [ "@Regression", "@OrderCompletePage" ]},
        async ({ page, productsPage, headerOptions, cartPage, checkoutPage, overviewPage, orderCompletePage }) => {
            const productName = PRODUCT_NAMES[0];
            await productsPage.addProductToCart(productName);
            await headerOptions.goToCartPage();
            await cartPage.goToCheckoutPage();
            await checkoutPage.fillUserInfo(FIRSTNAME, LASTNAME, POSTALCODES);
            await checkoutPage.clickContinueButton();
            await overviewPage.clickFinishButton();
            const orderCompleteText = await orderCompletePage.orderCompleteTextIsDisplayed();
            const orderCompleteCheckMark = await orderCompletePage.orderCompleteCheckMarkIsVisible();
            const thankYouForYourOrder = await orderCompletePage.thankYouForYourOrderIsDisplayed();
            const backButton = await orderCompletePage.backHomeButtonIsDisplayed();
            const text = await orderCompletePage.getThankYouForYourOrderText();
            console.log(text);

            expect(orderCompleteText).toBeTruthy();
            expect(orderCompleteCheckMark).toBeTruthy();
            expect(thankYouForYourOrder).toBeTruthy();
            expect(backButton).toBeTruthy();

            await page.close();
    })

    test("Verify the text present on order complete page", { tag: [ "@Regression", "@OrderCompletePage" ]},
        async({ page, productsPage, headerOptions, cartPage, checkoutPage, overviewPage, orderCompletePage })=>{
            const productName = PRODUCT_NAMES[1];
            await productsPage.addProductToCart(productName);
            await headerOptions.goToCartPage();
            await cartPage.goToCheckoutPage();
            await checkoutPage.fillUserInfo(FIRSTNAME, LASTNAME, POSTALCODES);
            await checkoutPage.clickContinueButton();
            await overviewPage.clickFinishButton();
            const orderComleteText = await orderCompletePage.getOrderCompleteText();
            const thankYouText = await orderCompletePage.getThankYouForYourOrderText();

            expect(thankYouText).toEqual("Thank you for your order!");
            expect(orderComleteText).toEqual("Your order has been dispatched, and will arrive just as fast as the pony can get there!");

            await page.close();

        })

        test("Check clicking the back home button", { tag: [ "@Regression", "@OrderCompletePage" ]},
           async ({ page, productsPage, headerOptions, cartPage, checkoutPage, overviewPage, orderCompletePage }) => {
                const productName = PRODUCT_NAMES[0];
                await productsPage.addProductToCart(productName);
                await headerOptions.goToCartPage();
                await cartPage.goToCheckoutPage();
                await checkoutPage.fillUserInfo(FIRSTNAME, LASTNAME, POSTALCODES);
                await checkoutPage.clickContinueButton();
                await overviewPage.clickFinishButton();
                await orderCompletePage.clickBackHomeButton();
                const Url = page.url();   
                expect(Url).toBe("https://www.saucedemo.com/inventory.html");       
                
                await page.close();
        })
})
