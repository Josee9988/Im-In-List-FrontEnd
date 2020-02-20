import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent {
  themes = [
    {
      primary: '#673ab7', // default
      id: 0
    },
    {
      primary: '#1a1717', // dark theme
      id: 1
    },
    {
      primary: '#E91E63',
      id: 2
    },
    {
      primary: '#9C27B0',
      id: 3
    },
  ];

  constructor(
  ) {

  }

  installTheme(id: number) {
    console.log(id);

  }

}
