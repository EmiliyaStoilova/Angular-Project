import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/interfaces/product';
import { IUser } from '../shared/interfaces/user';
import { AuthService } from '../user/auth.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    productId: string;

    constructor(
        private afDb: AngularFirestore,
        private router: Router,
        private user: AuthService
    ) { }

    create(data: IProduct) {
        return this.afDb.collection<IProduct>('products').add(data).then(res => {
            this.router.navigate(["user/profile"]);
            this.setUser(res.id)
        })
    }

    async setUser(id){
        const uid = (await this.user.getUserId()).toString()

        this.afDb.collection<IProduct>('products').doc(this.productId).update({id})

        this.afDb.collection<IUser>('users').doc(uid).valueChanges().subscribe(data => {
            if(!data.products.includes(id))
            {
                data.products.push(id)
            }
            this.user.updateUserProducts(data.products)
        })
    }

    loadData() {
        return this.afDb.collection<IProduct>('products').snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as IProduct;
                    return data;
                })
            }),
        )
    }

    delete(id) {
        this.afDb.collection<IProduct>('products').doc(id).delete()
    }
}