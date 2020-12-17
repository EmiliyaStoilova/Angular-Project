import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';


const productRoutes: Routes = [
    {
        path: 'product',
        children: [
            {
                path: 'addProduct',
                component: AddProductComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
];

export const ProductRoutingModule = RouterModule.forChild(productRoutes);