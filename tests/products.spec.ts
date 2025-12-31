import { expect, test } from '../fixtures/login.fixture';
import { standardUser } from '../test-data/loginData';

// test.beforeEach("Login using valid data", async ({ loginPage }) => {
//     // Arrange
//     await loginPage.openLoginPage();
//     await loginPage.login(standardUser.username, standardUser.password);
// });

test.describe('Product Page tests', () => {
    test('Add product to cart', { tag: ["@Smoke", "@ProductsPage"] }, async ({ page, productsPage, headerOptions }) => {
        // Act 
        const productName = "Sauce Labs Backpack";
        await productsPage.addProductToCart(productName);
        const totalItemsCount = await headerOptions.getNumberOfCartItems();
        console.log(totalItemsCount);

        // Assert
        expect(totalItemsCount).toEqual(1);
        await page.close();
    });

    test("Verify the cart product name ", { tag: ["@Regression", "@ProductsPage"] }, async ({ productsPage, headerOptions, cartPage, page }) => {
        // Act
        const productName = "Sauce Labs Backpack";
        await productsPage.addProductToCart(productName);
        await headerOptions.shoppingCartLink.click();
        // Assert
        const cartPageUrl = page.url();
        expect(cartPageUrl).toEqual("https://www.saucedemo.com/cart.html");
        const actualCartProductName = await cartPage.getProductName(productName);
        expect(productName).toEqual(actualCartProductName);
        await page.close();
    });

    test("Verify the product price in cart", async ({ headerOptions, productsPage, cartPage, page }) => {
        const productName = "Sauce Labs Backpack";
        const productPriceBeforeAddToCart = await productsPage.getProductPriceByName(productName);

        await productsPage.addProductToCart(productName);
        await headerOptions.shoppingCartLink.click();

        // Assert

        const cartPageUrl = page.url();
        expect(cartPageUrl).toEqual("https://www.saucedemo.com/cart.html");

        const productPriceAfterAddToCart = await cartPage.getProductPrice(productName);
        expect(productPriceBeforeAddToCart).toEqual(productPriceAfterAddToCart);
        await page.close();
    });
});
