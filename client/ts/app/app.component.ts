/**
 * Created by ufk on 23/06/2016.
 */

import { Component } from "@angular/core";
import { MD_TOOLBAR_DIRECTIVES } from "@angular2-material/toolbar";
import {Auth} from "./auth.service";
import { ROUTER_DIRECTIVES } from "@angular/router";


@Component({
    selector: "my-app",
    directives: [MD_TOOLBAR_DIRECTIVES,ROUTER_DIRECTIVES],
    providers: [Auth],
    templateUrl: "/www/my-app.html"
})
export class AppComponent {
    constructor(private auth: Auth) {

    }
}