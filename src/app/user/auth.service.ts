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
                localStorage.setItem('uid', uid);
                this.router.navigate(["/"]);
                // document.cookie = `${environment.cookie}=${value.user.ya}`;
            })
            .catch(err => {
                console.log('Something went wrong!')
            });
    }

    login(formData) {
        this.firestor.signInWithEmailAndPassword(formData.email, formData.password)
            .then(value => {
                console.log('Nice, it worked!');
                localStorage.setItem('uid', value.user.uid);

                this.router.navigate(["/"]);
                document.cookie = `${environment.cookie}=${value.user.ya}`;
            })
            .catch(err => {
                console.log('There is something wrong');
            });
    }

    logout() {
        this.firestor.signOut().then(res => {
            this.router.navigate(["/"]);
            localStorage.clear();
            console.log(document.cookie)
            const cookie = document.cookie.split('=')[1]
            console.log(cookie)
            document.cookie = `${environment.cookie}=${cookie}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        })
    }

    getUser() {
        const id = this.getUserId()
        // const userData = this.afDb.collection<IUser>('users/' + id);
        return this.afDb.collection<IUser>('users').doc(id).valueChanges()
        // .snapshotChanges().pipe(
        //     map(changes => {
        //         return changes.payload.data() as IUser
        //     })
        // )
    }

    updateUser(user) {
        const id = this.getUserId()
        return this.afDb.collection<IUser>('users').doc(id).set(user)
    }

    getUserId() {
        const id = localStorage.getItem('uid')
        return id
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