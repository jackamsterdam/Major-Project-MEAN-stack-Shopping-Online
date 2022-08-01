import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartListComponent } from '../cart-list/cart-list.component';

export interface DialogData {
  action: 'removeAll' | 'remove'
}

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<CartListComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
