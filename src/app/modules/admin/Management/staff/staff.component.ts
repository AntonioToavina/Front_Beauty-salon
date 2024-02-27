import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ShareComponent } from '../../../../shared/Component/ShareComponent';
import { MatDialog } from '@angular/material/dialog';
import { StaffCreationComponent } from './staff-creation/staff-creation.component';
import { StaffService } from './staff.service';
import { User } from '../../../../models/User';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { ConfirmationComponent } from '../../../Common/confirmation/confirmation.component';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
})
export class StaffComponent extends ShareComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    dataSource: any;
    URL_API = environment.URL_API;
    displayedColumns: string[] = [
        'avatar',
        'name',
        'firstname',
        'email',
        'posts',
        'status',
        'edit',
        'delete',
    ];
    services: any[];

    constructor(
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private _staffService: StaffService,
    ) {
        super();
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<User>(
            this.route.snapshot.data['initialData'][0].data,
        );

        
        this.services =
            this.route.snapshot.data['initialData'][1].data?.services;
        this.dataSource.sort = this.sort;
    }

    syncData() {
        this._staffService
            .getAll()
            .subscribe(
                (data) =>
                    (this.dataSource = new MatTableDataSource<User>(data.data)),
            );
    }

    addStaff() {
        this._matDialog
            .open(StaffCreationComponent, {
                width: '900px',
                data: { services: this.services },
            })
            .afterClosed()
            .subscribe(() => {
                this.syncData();
            });
    }

    updateStaff(staff: User) {
        this._matDialog
            .open(StaffEditComponent, {
                width: '900px',
                data: { services: this.services, staff: staff },
            })
            .afterClosed()
            .subscribe(() => {
                this.syncData();
            });
    }

    deleteStaff(id: string) {
        this._matDialog
            .open(ConfirmationComponent, {
                data: {
                    type: 'delete',
                    message: 'Voulez vous supprimez cet employé ? ',
                },
            })
            .afterClosed()
            .subscribe((response) => {
                if (response) {
                    this._staffService
                        .delete(id)
                        .subscribe(() => this.syncData());
                }
            });
    }
}
