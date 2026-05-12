import { Locator, Page } from "@playwright/test";
import { NavBarComponent } from "../../src/pages/components/navbar.component";
import { ActionBarCompnent } from "../../src/pages/components/action-bar.component";

export class LoginPage {
    navBar: NavBarComponent;
    actionBar: ActionBarCompnent;

    constructor(private readonly page: Page) {
        this.navBar = new NavBarComponent();
        this.actionBar = new ActionBarCompnent();
    }

    async clickMenuProduct() {
        await this.navBar.clickMenuHome();
    }
}