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
      primary: '#e91e63', // red theme
      id: 2
    },
    {
      primary: '#3f51b5', // blue theme
      id: 3
    },
  ];

  onInstallTheme(id: number) {
    switch (id) {
      case 0: // default theme
        document.body.className = '';
        break;
      case 1: // dark theme
        document.body.className = 'iminlist-dark-theme';
        break;
      case 2: // red theme
        document.body.className = 'iminlist-red-theme';
        break;
      case 3: // blue theme
        document.body.className = 'iminlist-blue-theme';
        break;
      default: // default theme
        document.body.className = '';
        break;
    }

  }

}
