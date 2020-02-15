import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

interface IDialogUrl {
  url: string;
}
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.scss']
})
export class ShowDialogComponent {
  public url: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogUrl) {
    this.url = data.url;
  }
}
