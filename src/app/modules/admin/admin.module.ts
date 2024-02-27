import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Route, RouterModule } from '@angular/router';

const adminRoutes: Route[] = [
    {
        path: 'dashboard',
        component: HomeComponent,
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'management',
        loadChildren: () =>
            import('app/modules/admin/Management/management.module').then(
                (m) => m.ManagementModule,
            ),
    },

    {
        path: 'expense',
        loadChildren: () =>
            import('app/modules/admin/expense/expense.module').then(
                (m) => m.ExpenseModule,
            ),
    },
];

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule.forChild(adminRoutes)],
})
export class AdminModule {}
