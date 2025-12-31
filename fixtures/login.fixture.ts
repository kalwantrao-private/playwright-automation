import { LoginPage } from "../pages/login.page";
import { test as baseTest } from '@playwright/test';
import { header } from "../pages/headerSection.page";
import { products } from "../pages/products.page";
import { cartPage } from "../pages/cart.page";

type MyFixtures = {
    loginPage: LoginPage;
    headerOptions: header;
    productsPage: products;
    cartPage: cartPage;
    
}

export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        const login = new LoginPage(page);
        await use(login);
    },

    headerOptions: async ({page}, use) => {
        const headerOptions = new header(page);
        await use(headerOptions);
    },

    productsPage: async ({page},use)=> {
        const object = new products(page);
        await object.goTo();
        await use(object);
    },

    cartPage: async({page},use) => {
        const object = new cartPage(page);
        // await object.goTo();
        await use(object);
    }
});

export {expect} from '@playwright/test';

