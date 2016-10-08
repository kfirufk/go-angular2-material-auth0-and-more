/**
 * Created by ufk on 23/06/2016.
 */

import { Component } from "@angular/core";
import {Auth} from "./auth.service";


@Component({
    selector: "my-app",
    providers: [Auth],
    templateUrl: "/www/my-app.html"
})
export class AppComponent {
    constructor(private auth: Auth) {

    }
}