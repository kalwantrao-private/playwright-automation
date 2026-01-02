import { FIRSTNAME, LASTNAME, POSTALCODES, PRODUCT_NAMES } from "../constants/constant";
import { expect, test } from "../fixtures/login.fixture";

test.describe("Overview Page", () => {
    test(
        "Verify product information on overview page", { tag: ["@OverviewPage", "@Regression"] },
        async ({ page, productsPage, cartPage, headerOptions, checkoutPage, overviewPage }) => {
            const productName = PRODUCT_NAMES[1];
            // Add product to cart
            await productsPage.addProductToCart(productName);
            const priceOnProductPage = await productsPage.getProductPriceByName(productName);
            // Navigate to cart page
            await headerOptions.goToCartPage();
            await cartPage.goToCheckoutPage();
            // fill the user details to complete the order
            await checkoutPage.fillUserInfo(FIRSTNAME, LASTNAME, POSTALCODES);
            await checkoutPage.clickContinueButton();
            // Assert
            // Check navigated to overview page
            expect(await overviewPage.overviewText.isVisible());
            const actualProdName = await overviewPage.getProductName(productName);
            const priceOnOverviewPage = await overviewPage.getProductPrice(productName);
            // Check the product name on overview page is equal to product name added in cart
            expect(priceOnProductPage).toBe(priceOnOverviewPage);
            expect(actualProdName).toBe(productName);
            console.log(await overviewPage.getProductPrice(productName));
            await page.close();
        });

    test(
        "Submit order with your information", { tag: ["@Regression", "@OverviewPage"] },
        async ({ page, headerOptions, productsPage, cartPage, checkoutPage, overviewPage, orderCompletePage }) => {
            // Arrnge
            const productName = PRODUCT_NAMES[1];
            await productsPage.addProductToCart(productName);
            // Act
            await headerOptions.goToCartPage();
            await cartPage.goToCheckoutPage();
            await checkoutPage.fillUserInfo(FIRSTNAME, LASTNAME, POSTALCODES);
            await checkoutPage.clickContinueButton();
            await overviewPage.submitOrder();
            // Assert
            expect(await orderCompletePage.orderCompleteCheckMarkIsVisible()).toBeTruthy();
            page.close();
        })

    test("Check error when all your information fields are empty", { tag: ["@Regression", "@OverviewPage"] },
        async ({ page, checkoutPage, productsPage, cartPage, headerOptions }) => {

            // Arrange
            const productName = PRODUCT_NAMES[0];
            const errorText = "Error: First Name is required";

            await productsPage.addProductToCart(productName);
            await headerOptions.goToCartPage();
            // Act
            await cartPage.goToCheckoutPage();
            await checkoutPage.clickContinueButton();
            const actualErrorText = await checkoutPage.errorMessageText();
            // Assert
            expect(errorText).toBe(actualErrorText);
            await page.close();
        });

})

