import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { ShareComponent } from 'app/shared/Component/ShareComponent';
import { StaffService } from '../Management/staff/staff.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector       : 'app-dashboard',
    templateUrl    : './dashboard.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent extends ShareComponent implements OnInit, OnDestroy
{
    chartWorkHour: ApexOptions = {};
    workHourData: any;
    workHourDate : any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    filterBody = {};

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _staffService: StaffService,
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
    )
    {
        super();
    }

    initForm(){
    
    
        this.form = this._formBuilder.group({
          min_date: [this.workHourDate.min,Validators.required],
          max_date: [this.workHourDate.max,Validators.required],
        });
      }


  handleFilterWorkHourChange() {
    
    this.form.valueChanges.subscribe((value) => {

      if(this.form.invalid) return;

      this.filterBody = {
        date_interval: {
          min: value.min_date,
          max: value.max_date,}      
        };
      this.syncData(this.filterBody);
    });
  
  }
    initWorkHourData() {
        const labels = [];
        const series = [];
        const totalHour = [];
        const averageHour = [];

        this.workHourData.forEach((item:any) => {
            // Extracting labels (staff names)
            labels.push(item.staff.name+ " "+item.staff.firstName);
        
            // Extracting series (averageWorkMinutes)
            totalHour.push(item.totalWorkMinutes);
            averageHour.push(item.averageWorkMinutes);

        });

        series.push({
            name: 'Durée moyenne',
            data: averageHour
        });
        series.push({
            name: 'Durée totale',
            data: totalHour
        });
        this.workHourData = {
            labels,series
        }
    }
    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the data
        const staffList =  this.route.snapshot.data.staff[0];
        this.workHourData = staffList.items;
        this.workHourDate = staffList.date_interval;

        this.initWorkHourData();
        this._prepareChartData();

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    }
                }
            }
        };

        this.initForm();

        this.handleFilterWorkHourChange();
    }



    syncData(data = this.filterBody) {
        this._staffService
            .getAverageWorkHour( data)
            .subscribe((response) => {
                this.workHourData = response.items;
                this.workHourDate = response.date_interval;
                this.initWorkHourData();
                this._prepareChartData();
            });
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void
    {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
             .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
             .forEach((el) => {
                 const attrVal = el.getAttribute('fill');
                 el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
             });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void
    {
        // WOrkhour chart
        this.chartWorkHour = {
            chart      : {
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'line',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            colors     : ['#64748B', '#94A3B8'],
            dataLabels : {
                enabled        : true,
                enabledOnSeries: [0],
                background     : {
                    borderWidth: 0
                },
                formatter: this.displayDuration
            },
            grid       : {
                borderColor: 'var(--fuse-border)'
            },
            labels     : this.workHourData.labels,
            legend     : {
                show: false
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%'
                }
            },
            series     : this.workHourData.series,
            states     : {
                hover: {
                    filter: {
                        type : 'darken',
                        value: 0.75
                    }
                }
            },
            stroke     : {
                width: [3, 0]
            },
            tooltip    : {
                followCursor: true,
                theme       : 'dark',
                y: {
                    formatter: this.displayDuration
                }
            },
            xaxis      : {
                axisBorder: {
                    show: false
                },
                axisTicks : {
                    color: 'var(--fuse-border)'
                },
                labels    : {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tooltip   : {
                    enabled: false
                }
            },
            yaxis      : {
                labels: {
                    offsetX: -16,
                    formatter: this.displayDuration,
                    style  : {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };
    }


    displayDuration(duration: number) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;

        return `${hours ? hours : '00'}:${minutes ? 
            minutes.toFixed(0) : '00'}`;
    }
}
