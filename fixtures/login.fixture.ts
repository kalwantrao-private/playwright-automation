import { LoginPage } from "../pages/login.page";
import { test as baseTest } from '@playwright/test';
import { header } from "../pages/headerSection.page";
import { products } from "../pages/products.page";
import { cartPage } from "../pages/cart.page";
import { checkout } from "../pages/checkout.page";
import { overview } from "../pages/overview.page";
import { completePage } from "../pages/complete.page";
import { productDetails } from "../pages/productDetail.page";

type MyFixtures = {
    loginPage: LoginPage;
    headerOptions: header;
    productsPage: products;
    cartPage: cartPage;
    checkoutPage: checkout;
    overviewPage: overview;
    orderCompletePage: completePage;
    productDetailsPage: productDetails;
}

export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const login = new LoginPage(page);
        await use(login);
    },

    headerOptions: async ({ page }, use) => {
        const object = new header(page);
        await use(object);
    },

    productsPage: async ({ page }, use) => {
        const object = new products(page);
        await object.goTo();
        await use(object);
    },

    cartPage: async ({ page }, use) => {
        const object = new cartPage(page);
        // await object.goTo();
        await use(object);
    },

    checkoutPage: async ({ page }, use) => {
        const object = new checkout(page);
        await use(object);
    },
    overviewPage: async ({ page }, use) => {
        const object = new overview(page);
        use(object);
    },
    orderCompletePage: async ({ page }, use) => {
        const object = new completePage(page);
        use(object);
    },
    productDetailsPage: async ({ page}, use) => {
        const object = new productDetails(page);
        use(object);
    }
});

export { expect } from '@playwright/test';

