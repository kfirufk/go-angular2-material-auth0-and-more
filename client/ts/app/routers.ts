/**
 * Created by ufk on 01/07/2016.
 */
import { provideRouter, RouterConfig } from "@angular/router";
import {WelcomeComponent} from "./welcome.component";
import {HelpComponent} from "./help.component";

export const routes:RouterConfig = [
    { path: "",redirectTo:"welcome",pathMatch:"full"},
    { path: "welcome", component: WelcomeComponent },
    { path: "help",component: HelpComponent},
    { path: "**",redirectTo:"welcome"}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
