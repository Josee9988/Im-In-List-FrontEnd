import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from './../../../../environments/environment';

interface IDialogUrl {
  url: string;
}

@Component({
  selector: 'app-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.scss']
})
/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class ShowDialogComponent implements OnInit {
  private readonly SITE_URL: string = environment.siteURl;
  public url: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogUrl, private dialogRef: MatDialogRef<ShowDialogComponent>) {
    this.url = `${this.SITE_URL}list/${data.url}`;
  }

  ngOnInit(): void {
    // close dialog event
    this.dialogRef.backdropClick().subscribe(() => {
      console.log('close me ');
    });
  }

  /**
   * Summary: Creates a HTML element, sets the value to the URL that we want to be copied,
   * and executes the copy command, so the user will have the URL copied in his clipboard,
   * after the text is copied it removes the created element.
   */
  copyUrl(): void {
    const selBox = document.createElement('textarea');
    selBox.style.opacity = '0';
    selBox.style.display = 'none';
    selBox.value = this.url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
