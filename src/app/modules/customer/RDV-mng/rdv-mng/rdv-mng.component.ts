import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../admin/Management/service.service';
import { User } from '../../../../models/User';
import { ShareComponent } from '../../../../shared/Component/ShareComponent';
import { FormBuilder, Validators } from '@angular/forms';
import {
    BryntumCalendarComponent,
    BryntumCalendarProjectModelComponent,
} from '@bryntum/calendar-angular';
import { calendarConfig, projectConfig } from '../rdv-calendar/config';
import { MatSelectChange } from '@angular/material/select';
import { StaffService } from '../../../admin/Management/staff/staff.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-rdv-mng',
    templateUrl: './rdv-mng.component.html',
})
export class RdvMngComponent extends ShareComponent implements OnInit {
    services: any[];
    staffsService: User[] = [];

    resources = [
        {
            id: 1,
            name: 'Vos rendez-vous',
            eventColor: 'green',
        },
        {
            id: 2,
            name: 'indisponible',
            eventColor: 'gray',
        },
    ];
    events = [];
    calendarConfig = calendarConfig;
    projectConfig = projectConfig;
    remainders = [
        { label: 'Tout les heures', value: 'h' },
        { label: 'Tout les jours', value: 'd' },
        { label: 'Tout les semaines', value: 'w' },
    ];

    @ViewChild('calendar') calendarComponent!: BryntumCalendarComponent;
    @ViewChild('project')
    projectComponent!: BryntumCalendarProjectModelComponent;
    dateTimeField: any;

    constructor(
        private route: ActivatedRoute,
        private _serviceService: ServiceService,
        private _formBuilder: FormBuilder,
        private _staffService: StaffService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.buildForm();
        this.services =
            this.route.snapshot.data['data'][0].data?.services.items;
    }

    buildForm() {
        this.form = this._formBuilder.group({
            service: ['', Validators.required],
            staff: ['', Validators.required],
            remainder: [''],
        });
    }

    addValue(event: any) {
        this.dateTimeField = event.value;
    }

    getStaffs(event: MatSelectChange) {
        this.staffsService = [];
        this._staffService
            .getStaffFromService(event.value)
            .subscribe((data) => (this.staffsService = data.data));
    }

    getServiceDateEnd(date: string, duration: number) {
        let end = new Date(date);
        end.setMinutes(end.getMinutes() + duration);
        return end;
    }

    makeBooking() {
        if (this.form.invalid || !this.dateTimeField) return;

        let booking = { ...this.form.value, startDate: this.dateTimeField };
        let duration = this.services.find(
            (service) => service._id === booking.service,
        ).duration;

        booking.endDate = this.getServiceDateEnd(booking.startDate, duration);
        this.events.push({
            id: 1,
            name: 'Travail',
            startDate: '2022-01-01T10:00:00',
            endDate: '2022-01-01T12:00:00',
            resourceId: 1,
        });
        console.log(this.events);
    }
}
