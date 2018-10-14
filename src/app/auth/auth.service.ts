import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private token: string;

    constructor(private router: Router) {}

    public signupUser(email: string, password: string) {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            );
    }

    public signinUser(email: string, password: string) {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/']);                            // [KEY]: Route to the home page

                    firebase.auth().currentUser.getIdToken()                // [KEY]: Get and store current AWT token right away.
                        .then(
                            (token: string) => this.token = token
                        )
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    public getToken(): string {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token                       // [KEY]: Update the local token
            );

        return this.token;                                                  // [KEY]: But return the local copy w/o waiting for the update
    }

    public isAuthenticated(): boolean {
        return this.token != null;
    }

    public logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}