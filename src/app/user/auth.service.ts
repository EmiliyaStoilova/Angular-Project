import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    cookie = '';

    constructor(
        private firestor: AngularFireAuth,
        private afDb: AngularFirestore,
        private router: Router
    ) { }

    isLoggedIn(): boolean {
        return !!document.cookie
    }

    register(email: string, password: string, username: string, address: string, phone: string) {

        this.firestor.createUserWithEmailAndPassword(email, password)
            .then(value => {
                const uid = value.user.uid;
                this.pushUserData({ username, address, phone, uid });
                console.log('Nice, it worked!');
                this.router.navigate(["/"]);
                this.cookie = value.user.ya;
                document.cookie = `${environment.cookie}=${value.user.ya}`;
            })
            .catch(err => {
                console.log('Something went wrong!')
            });
    }

    login(formData) {
        this.firestor.signInWithEmailAndPassword(formData.email, formData.password)
            .then(value => {
                console.log('Nice, it worked!');

                this.cookie = value.user.ya;
                this.router.navigate(["/"]);
                document.cookie = `${environment.cookie}=${value.user.ya}`;
            })
            .catch(err => {
                console.log('There is something wrong');
            });
    }

    logout() {
        // this.firestor.signOut().then()
        document.cookie = `${environment.cookie}=${this.cookie}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        this.router.navigate(["/"]);
    }

    async getUser() {
        const id = (await this.getUserId()).toString()
        // const userData = this.afDb.collection<IUser>('users/' + id);
        const userData = this.afDb.collection<IUser>('users').doc(id)

        return userData.valueChanges()
    }

    async updateUserProducts(user) {
        const id = (await this.getUserId()).toString()
        this.afDb.collection<IUser>('users').doc(id).update({products: user})
    }

    async updateUserOrders(user) {
        const id = (await this.getUserId()).toString()
        this.afDb.collection<IUser>('users').doc(id).update({orders: user})
    }

    async getUserId() {
        const id = (await (await this.firestor.currentUser).uid).toString();

        return id;
    }

    private pushUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<IUser> = this.afDb.doc(`users/${user.uid}`);
        const data = {
            username: user.username,
            phone: user.phone,
            address: user.address,
            products: [],
            orders: []
        };
        return userRef.set(data);
    }
}