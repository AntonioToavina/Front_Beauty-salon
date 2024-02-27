import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { environment } from 'app/environments/environment';
import { ShareComponent } from 'app/shared/Component/ShareComponent';
import { Subject, takeUntil } from 'rxjs';
import { PaymentComponent } from '../payment/payment.component';

@Component({
    selector: 'app-booking-history',
    templateUrl: './booking-history.component.html',
})
export class BookingHistoryComponent extends ShareComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    items: any[] = [];
    selectedItem: any;
    @ViewChild('itemList') itemList: ElementRef;
    formFieldHelpers: string[] = [''];


    totalItems = 0;
    itemsPerPage = 10;
    page = 1;


    URL_API = environment.URL_API;

    pagination = {
        startIndex: 0,
        endIndex: 9,
        totalResults: 20,
        currentPage: 1,
        lastPage: 3,
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {
        super();
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    detectChanges() {
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = false;
                } else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    removeSeleteditem(){
        
        this.selectedItem = null;
    }
    getItemData() {
        this.items = [
            {
                id: '1',
                name: "Manucure",
                date: new Date(),
                employee: {
                    id: 1,
                    name: 'Rakoto Ramiarimanana',
                    email: 'rakotoramari@gmail.com'
                },
                icon: 'heroicons_outline:user-circle',
                description: 'Manucure simple',
                achievedDate: null,
                duration: 45,
                price: 80000,
                customerId: 1,
            },
            {
                id: '2',
                name: "Pédicure",
                date: new Date(),
                employee: {
                    id: 1,
                    name: 'Rakoto Ramiarimanana',
                    email: 'rakotoramari@gmail.com'
                },
                achievedDate: new Date(),
                duration: 150,
                icon: 'heroicons_outline:lock-closed',
                price: 150000,
                payed_amount: 30000,
                customerId: 1
                // description: 'Gerer votre mot de passe',
            },
        ];
    }

    ngOnInit(): void {
        this.getItemData();
        this.detectChanges();
    }

    onSelectedItem(item: any): void {
        this.selectedItem = item;

        // Close the drawer on 'over' mode
        if (this.drawerMode === 'over') {
            this.drawer.close();
        }
    }

   
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    getTime(startDate: Date, durationInMinutes: number): string {
        const endTime = new Date(startDate);
        endTime.setMinutes(endTime.getMinutes() + durationInMinutes);
        // Format the time as "HH:mm"
        return `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
    }



    syncData(query= null,data = {}) {

    }


  pageChanged(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.syncData();
  }

  savePayment(){

    this._matDialog
        .open(
            PaymentComponent, {
              width: '900px',
              data: {
                booking: this.selectedItem,
              },
          }
        )
        .afterClosed()
        .subscribe(() => {
            this.syncData();
        });
  }
}
