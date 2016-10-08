/**
 * Created by ufk on 08/10/2016.
 */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule }  from "@angular/router";
import {AppComponent} from "./app.component";
import {WelcomeComponent} from "./welcome.component";
import {HelpComponent} from "./help.component";
import {APP_BASE_HREF} from "@angular/common";
import { MaterialModule } from "@angular/material";
import { AUTH_PROVIDERS }      from "angular2-jwt";

declare var APP_CONFIG:any;

@NgModule({
    providers: [AUTH_PROVIDERS,{provide: APP_BASE_HREF, useValue: APP_CONFIG.webServer.appBaseHref}],
    imports:      [ MaterialModule.forRoot(),BrowserModule,RouterModule.forRoot([
        { path: "",redirectTo:"welcome",pathMatch:"full"},
        { path: "welcome", component: WelcomeComponent },
        { path: "help",component: HelpComponent},
        { path: "**",redirectTo:"welcome"}
    ]) ],
    declarations: [
        AppComponent,HelpComponent,WelcomeComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }