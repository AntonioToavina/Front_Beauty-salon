import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin',
    },
    {
        path: '',
        canActivate: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule,
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule,
                    ),
            },
            {
                path: 'auth-confirmed',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
        ],
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'admin',
                loadChildren: () =>
                    import('app/modules/admin/admin.module').then(
                        (m) => m.AdminModule,
                    ),
            },
            {
                path: 'staff',
                loadChildren: () =>
                    import('app/modules/staff/staff.module').then(
                        (m) => m.StaffModule,
                    ),
            },
            {
                path: 'customer',
                loadChildren: () =>
                    import('app/modules/customer/customer.module').then(
                        (m) => m.CustomerModule,
                    ),
            },
        ],
    },

    {
        path: '**',
        loadChildren: () =>
            import('app/modules/Common/error-404/error-404.module').then(
                (module) => module.Error404Module,
            ),
        data: { title: 'Error', layout: 'compact' },
    },
];
