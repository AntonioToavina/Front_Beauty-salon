import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntlFrench } from 'app/custom/intl/MatpaginatorIntlFrench';
import localeFr from '@angular/common/locales/fr';
import { SharedModule } from 'app/shared/module/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingHistoryResolver } from 'app/resolvers/BookingResolver';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { MatMenuModule } from '@angular/material/menu';
import { PaymentComponent } from './payment/payment.component';
import {MatRadioModule} from '@angular/material/radio';

registerLocaleData(localeFr, 'fr');


const bookingRoutes: Route[] = [
  // link to the component that Toavina created 
  {
    path: 'general',
    component: BookingHistoryComponent,
    resolve: {

      initialData: BookingHistoryResolver
    }
  },
  // ---------------
  {
    path: 'history',
    component: BookingHistoryComponent,
    resolve: {
      initialData: BookingHistoryResolver
    }
  },
];


@NgModule({
  declarations: [BookingHistoryComponent,PaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(bookingRoutes), 
    MatInputModule,
    MatButtonModule,
    FuseAlertModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSliderModule,
    MatCheckboxModule,
    SharedModule,
    MatSidenavModule,
    MatMenuModule,
    MatRadioModule
  ],
  
  providers: [
    {provide: LOCALE_ID, useValue: 'fr'},
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlFrench }

  ]
})
export class BookingModule { }
