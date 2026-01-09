import { CART_URL, PRODUCT_NAMES } from '../constants/constant';
import { expect, test } from '../fixtures/login.fixture';

// Alternate way to handle login step
// Here login is handled by global set up -- project dependencies
// test.beforeEach("Login using valid data", async ({ loginPage }) => {
//     // Arrange
//     await loginPage.openLoginPage();
//     await loginPage.login(standardUser.username, standardUser.password);
// });

test.describe('Product Page tests', () => {
    test(
        "TC_001_Add product to cart",
        { tag: ["@Smoke", "@ProductsPage"] },
        async ({ page, productsPage, headerOptions }) => {
            // Act
            const productName = PRODUCT_NAMES[0];
            await productsPage.addProductToCart(productName);

            const totalItemsCount = await headerOptions.getNumberOfCartItems();
            // Assert
            expect.soft(totalItemsCount).toEqual(1);
            await page.close();
        });

    test(
        "TC_002_Add all products to cart and check count",
        { tag: ["@Regression", "@ProductsPage"] },
        async ({ page, productsPage, headerOptions }) => {
            // Act
            for (const ProductName of PRODUCT_NAMES) {
                await productsPage.addProductToCart(ProductName);
            }
            const totalItemsCount = await headerOptions.getNumberOfCartItems();
            // Assert
            expect.soft(totalItemsCount).toEqual(PRODUCT_NAMES.length);
            await page.close();
        });

    test(
        "TC_003_Remove product from cart",
        { tag: ["@Regression", "@ProductsPage"] },
        async ({ page, productsPage, headerOptions }) => {
            const productName = PRODUCT_NAMES[1];
            await productsPage.addProductToCart(productName);
            const totalItemsCountAfterAdd = await headerOptions.getNumberOfCartItems();
            expect.soft(totalItemsCountAfterAdd).toEqual(1);

            await productsPage.removeProductFromCart(productName);
            await page.close();
        });

    test(
        "TC_004_Verify the cart product name ",
        { tag: ["@Regression", "@ProductsPage"] },
        async ({ productsPage, headerOptions, cartPage, page }) => {
            // Act
            const productName = PRODUCT_NAMES[2];
            await productsPage.addProductToCart(productName);
            await headerOptions.shoppingCartLink.click();
            // Assert
            const cartPageUrl = page.url();
            expect.soft(cartPageUrl).toEqual(CART_URL);
            const actualCartProductName = await cartPage.getProductName(productName);
            expect.soft(productName).toEqual(actualCartProductName);
            await page.close();
        });

    test(
        "TC_005_Verify the product price in cart",
        { tag: ["@Regression", "@ProductsPage"] },
        async ({ headerOptions, productsPage, cartPage, page }) => {
            const productName = PRODUCT_NAMES[3];
            const productPriceBeforeAddToCart = await productsPage.getProductPriceByName(productName);

            await productsPage.addProductToCart(productName);
            await headerOptions.shoppingCartLink.click();

            // Assert

            const cartPageUrl = page.url();
            expect.soft(cartPageUrl).toEqual(CART_URL);

            const productPriceAfterAddToCart = await cartPage.getProductPrice(productName);
            expect.soft(productPriceBeforeAddToCart).toEqual(productPriceAfterAddToCart);
            await page.close();
        });

    test(
        "TC_006_Check products count on cart page",
        { tag: ["@ProductsPage", "@Regression"] },
        async ({ headerOptions, productsPage, cartPage }) => {
            // Arrange
            for (const products of PRODUCT_NAMES) {
                await productsPage.addProductToCart(products);
            }
            // Act
            await headerOptions.goToCartPage();
            const ActualCount = await cartPage.getNumberOfCartItems();
            // Assert
            expect(ActualCount).toEqual(PRODUCT_NAMES.length);
        });

    test(
        "TC_007_Navigate to products page from cart page",
        { tag: ["@ProductsPage", "@Regression"] },
        async ({ page, headerOptions, cartPage, productsPage }) => {
            // Arrange
            const productName = PRODUCT_NAMES[4];
            await productsPage.addProductToCart(productName);
            // Act
            await headerOptions.goToCartPage();
            expect.soft(await cartPage.yourCartText.isVisible());
            await cartPage.goToProductsPageFromCart();
            // Assert
            await expect.soft(productsPage.productsHeading).toBeVisible();
            await page.close();
        });

    test(
        "TC_008_Check removing product from cart page",
        { tag: ["@Regression", "@ProductPage"] },
        async ({ page, productsPage, headerOptions, cartPage }) => {
            const prouctName = PRODUCT_NAMES[4];
            // Arrange - add product to cart
            await productsPage.addProductToCart(prouctName);
            await headerOptions.goToCartPage();
            // Assert - check the actual product name on cart page
            const actualCartProductName = await cartPage.getProductName(prouctName);
            expect.soft(actualCartProductName).toBe(prouctName);
            // Arrange - remove the product from cart
            const count_beforeRemove = await cartPage.getNumberOfCartItems();
            expect.soft(count_beforeRemove).toBe(1);

            await cartPage.removeProductFromCart(prouctName);

            const count_afterRemove = await cartPage.getNumberOfCartItems();
            expect.soft(count_afterRemove).toBe(0);

            await page.close()
        });

});
