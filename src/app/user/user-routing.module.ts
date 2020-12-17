import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';


const userRoutes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'shoppingcard',
                component: ShoppingCardComponent,
                canActivate: [AuthGuard]
            }]

    }
];

export const UserRoutingModule = RouterModule.forChild(userRoutes);