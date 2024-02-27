import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/module/shared.module';
import { Error404Component } from 'app/modules/Common/error-404/error-404.component';
import { error404Routes } from 'app/modules/Common/error-404/error-404.routing';

@NgModule({
    declarations: [Error404Component],
    imports: [
        RouterModule.forChild(error404Routes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
    ],
})
export class Error404Module {}
