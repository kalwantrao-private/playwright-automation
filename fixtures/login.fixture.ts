import { LoginPage } from "../pages/login.page";
import { test as baseTest } from '@playwright/test';
import { Header } from "../pages/headerSection.page";
import { Products } from "../pages/products.page";
import { CartPage } from "../pages/cart.page";
import { Checkout } from "../pages/checkout.page";
import { Overview } from "../pages/overview.page";
import { CompletePage } from "../pages/checkoutComplete.page";
import { ProductDetails } from "../pages/productDetail.page";

interface MyFixtures  {
    loginPage: LoginPage;
    headerOptions: Header;
    productsPage: Products;
    cartPage: CartPage;
    checkoutPage: Checkout;
    overviewPage: Overview;
    orderCompletePage: CompletePage;
    productDetailsPage: ProductDetails;
}

export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const login = new LoginPage(page);
        await use(login);
    },

    headerOptions: async ({ page }, use) => {
        const object = new Header(page);
        await use(object);
    },

    productsPage: async ({ page }, use) => {
        const object = new Products(page);
        await object.goTo();
        await use(object);
    },

    cartPage: async ({ page }, use) => {
        const object = new CartPage(page);
        // await object.goTo();
        await use(object);
    },

    checkoutPage: async ({ page }, use) => {
        const object = new Checkout(page);
        await use(object);
    },
    overviewPage: async ({ page }, use) => {
        const object = new Overview(page);
        use(object);
    },
    orderCompletePage: async ({ page }, use) => {
        const object = new CompletePage(page);
        use(object);
    },
    productDetailsPage: async ({ page}, use) => {
        const object = new ProductDetails(page);
        use(object);
    }
});

export { expect } from '@playwright/test';

