/**
 * Created by ufk on 24/06/2016.
 */

import {Injectable} from "@angular/core";
import {tokenNotExpired} from "angular2-jwt";


// Avoid name not found warnings
declare var APP_CONFIG: any;
declare var Auth0Lock: any;

@Injectable()
export class Auth {
    // Configure Auth0
    lock = new Auth0Lock(APP_CONFIG.auth0.apiKey, APP_CONFIG.auth0.domain, {});

    constructor() {
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem("id_token", authResult.idToken);
        });
    }

    public login() {
        this.lock.show({
            callbackURL: APP_CONFIG.auth0.callbackUrl
        });
    };

    public authenticated() {
        // Check if there"s an unexpired JWT
        // It searches for an item in localStorage with key == "id_token"
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem("id_token");
    };
}