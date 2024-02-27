import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { ExpenseCategoryService } from 'app/modules/admin/expense/expense-category.service';
import { ExpenseService } from 'app/modules/admin/expense/expense.service';
import { FrequencyService } from 'app/modules/admin/expense/frequency.service';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExpenseResolver implements Resolve<any> {
    constructor(
        private expenseService: ExpenseService,
        private expenseCategoryService: ExpenseCategoryService,
        private frequencyService: FrequencyService,
    ) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return forkJoin([
            this.expenseService.getAll(1, 10),
            this.expenseCategoryService.getAll(),
            this.frequencyService.getAll(),
        ]);
    }
}
