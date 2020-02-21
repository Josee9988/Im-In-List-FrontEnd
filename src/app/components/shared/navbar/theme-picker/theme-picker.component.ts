import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { ITheme } from './ITheme.interface';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {
  currentTheme: number;
  themes: Array<ITheme> = [
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

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    if (this.themeService.getActualTheme() !== null) {
      this.currentTheme = this.themeService.getActualTheme();
      this.onInstallTheme(this.currentTheme);
    } else {
      this.currentTheme = 0;
    }

  }

  onInstallTheme(id: number) {
    this.themeService.saveTheme(id);
    this.currentTheme = id;
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
