import { PRODUCT_NAMES } from '../constants/constant'
import { expect, test } from '../fixtures/login.fixture'

test.describe("Go to Product details from cart", () => {
    test("Verify the Product details", { tag: ["@Regression", "@ProductDetailsPage"] },
        async ({ page, productsPage, headerOptions, cartPage, productDetailsPage }) => {
            const productName = PRODUCT_NAMES[0];
            await productsPage.addProductToCart(productName);
            const productPrice = await productsPage.getProductPriceByName(productName);
            await headerOptions.goToCartPage();
            await cartPage.checkProductDetailsBeforeCheckout(productName);
            const actualName = await productDetailsPage.getProductName(productName);
            const actualPrice = await productDetailsPage.getProductPrice(productName);
            expect(productName).toBe(actualName);
            expect(productPrice).toBe(actualPrice);
            await page.close();
        });

    test("Remove product from cart from product details", { tag: ["@Regression", "@ProductDetailsPage"] },
        async ({ page, productsPage, cartPage, headerOptions, productDetailsPage }) => {
            const productName = PRODUCT_NAMES[1];
            await productsPage.addProductToCart(productName);
            await headerOptions.goToCartPage();
            const count_beforeRemovingProduct = await cartPage.getNumberOfCartItems();
            expect(count_beforeRemovingProduct).toBe(1);
            await cartPage.checkProductDetailsBeforeCheckout(productName);
            await productDetailsPage.removeProductFromCart(productName);
            await headerOptions.goToCartPage();
            const count_afterRemovingProduct = await cartPage.getNumberOfCartItems();
            expect(count_afterRemovingProduct).toBe(0);
            page.close();
        });
});
