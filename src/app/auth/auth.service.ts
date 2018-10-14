import * as firebase from 'firebase';

export class AuthService {
    private token: string;

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