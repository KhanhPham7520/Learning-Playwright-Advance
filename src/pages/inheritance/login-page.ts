import { ActionBarCompnent } from "@pages/components/action-bar.component";
import { NavBarComponent } from "@pages/components/navbar.component";
import { Locator, Page } from "@playwright/test";

export class LoginPage {
    navbar: NavBarComponent
    actionBar: ActionBarCompnent;

    constructor(private readonly page: Page) {
        this.navbar = new NavBarComponent();
        this.actionBar = new ActionBarCompnent();
    }

    async goto() {
        await this.page.goto("");
    }

    async clickMenuProduct() {
        await this.navbar.clickMenuHome();
    }
}