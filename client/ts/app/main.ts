/**
 * Created by ufk on 23/06/2016.
 */

import "reflect-metadata";
import "zone.js/dist/zone";
import { bootstrap }    from "@angular/platform-browser-dynamic";
import { HTTP_PROVIDERS } from "@angular/http";
import {AUTH_PROVIDERS} from "angular2-jwt";
import {AppComponent} from "./app.component";
import {APP_ROUTER_PROVIDERS} from "./routers";
import {APP_BASE_HREF} from "@angular/common";


declare var APP_CONFIG: any;

bootstrap(AppComponent,[HTTP_PROVIDERS,AUTH_PROVIDERS,APP_ROUTER_PROVIDERS,
    {provide: APP_BASE_HREF, useValue: APP_CONFIG.webServer.appBaseHref}]);