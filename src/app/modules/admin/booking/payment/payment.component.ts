import { Component, Inject } from "@angular/core";
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ShareComponent } from "app/shared/Component/ShareComponent";
import { PaymentService } from "./payment.service";
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

import _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from "@angular/material/datepicker";

const moment = _rollupMoment || _moment;
export const MONTH_YEAR_FORMATS = {
    parse: {
      dateInput: 'MM/YYYY',
    },
    display: {
      dateInput: 'MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
@Component({
    selector: "app-expense-edit",
    templateUrl: "./payment.component.html",
    providers: [
        provideMomentDateAdapter(MONTH_YEAR_FORMATS),
      ],
})
export class PaymentComponent extends ShareComponent {
    booking: any;


    monthMapper = [{
        id: 1,
        label: 'Janvier'
    },{
        id: 2,
        label: 'Février'
    },{
        id: 3,
        label: 'Mars'
    },{
        id: 4,
        label: 'Avril'
    },{
        id: 5,
        label: 'Mai'
    },{
        id: 6,
        label: 'Juin'
    },{
        id: 7,
        label: 'Juillet'
    },{
        id: 8,
        label: 'Août'
    },{
        id: 9,
        label: 'Septembre'
    },{
        id: 10,
        label: 'Octobre'
    },{
        id: 11,
        label: 'Novembre'
    },{
        id: 12,
        label: 'Décembre'
    }]


    constructor(
        public matDialogRef: MatDialogRef<PaymentComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _paymentService: PaymentService,
    ) {
        super();
    }
    

    initForm(){

        
        this.form = this._formBuilder.group({
            paymentMethod: ['credit-card',Validators.required],
            firstname: ['',Validators.required],
            lastname: ['',Validators.required],
            cardNumber: ['',Validators.required],
            cvv: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(4)]],
            expirationDate: ['',[Validators.required,this.minDateValidator(new Date())]],
            expirationYear: ['',Validators.required],
            expirationMonth: ['',Validators.required],
            amount: [this.booking.price-this.booking.payed_amount,[Validators.required,Validators.min(1)]],
            payDate: [new Date(),Validators.required],
            customerId: [this.booking.customerId,Validators.required],
            bookingId: [this.booking.id,Validators.required],
        })
    }

    ngOnInit() {
        this.booking = this.data.booking;

        this.initForm();

    }

    closeModal() {
        this.matDialogRef.close();
    }

    onSubmit() {

        
        if (this.form.invalid) return;
        this.form.disable();


        this._paymentService.save(this.form.value).subscribe((data) => {
            if (data.state == 'error') this.alert.type = 'error';
            else {
                this.alert.type = 'success';
                this.callback = () => {
                    this.form.reset();
                    this.closeModal();
                };
            }
            this.alert.message = data.message;
            this.handleMessage();
        });
        
    }

    setExpirationDate(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
        let ctrlValue = this.form.get('expirationDate').value;
        ctrlValue = ctrlValue && ctrlValue !== '' ? moment(ctrlValue) : moment();
        ctrlValue.month(normalizedMonthAndYear.month());
        ctrlValue.year(normalizedMonthAndYear.year());
        this.form.get('expirationDate').setValue(ctrlValue);
        this.form.get('expirationYear').setValue(ctrlValue.year());
        this.form.get('expirationMonth').setValue(ctrlValue.month());
        datepicker.close();
      }

    minDateValidator(minDate: Date): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const selectedDate = control.value;
            if (selectedDate && selectedDate < minDate) {
                return { matDatepickerMin: true };
            }
            return null;
        };
    }
}