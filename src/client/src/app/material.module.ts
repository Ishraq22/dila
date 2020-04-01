import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatGridListModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatTableModule,
        MatDialogModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatNativeDateModule,
        MatGridListModule,
        MatDatepickerModule,
        MatTableModule,
        MatDialogModule,
        MatProgressSpinnerModule,
    ],
    declarations: []
})
export class AllMaterialModuleModule { }
