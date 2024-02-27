import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { RdvMngComponent } from './RDV-mng/rdv-mng/rdv-mng.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { RdvCalendarComponent } from './RDV-mng/rdv-calendar/rdv-calendar.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BryntumCalendarModule } from '@bryntum/calendar-angular';
import { MatChipsModule } from '@angular/material/chips';
import { BookingResolver } from '../../resolvers/BookingResolver';

const customerRoutes: Route[] = [
    {
        path: 'rdvMng',
        component: RdvMngComponent,
        resolve: {
            data: BookingResolver,
        },
    },
];

@NgModule({
    declarations: [RdvMngComponent, RdvCalendarComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(customerRoutes),
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        NgxMaterialTimepickerModule,
        ReactiveFormsModule,
        MatSortModule,
        MatTableModule,
        BryntumCalendarModule,
        MatChipsModule,
    ],
})
export class CustomerModule {}
