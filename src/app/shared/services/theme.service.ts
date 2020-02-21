import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class ThemeService {
  /**
   * The name of the local storage item that will be saving the theme id..
   */
  private readonly storageName: string = 'selectedTheme';

  /**
   * Summary: returns the actual theme id.
   *
   * @returns number | null : Number if the theme id was found, otherwise null.
   */
  getActualTheme(): number | null {
    const lStorageItem: string = localStorage.getItem(this.storageName);
    if (lStorageItem) {
      return Number(lStorageItem);
    }
    return null;
  }

  /**
   * Summary: saves the theme id received.
   *
   * @param number the theme id.
   */
  saveTheme(id: number): void {
    if (id) {
      this.deleteTheme();
      localStorage.setItem(this.storageName, id.toString());
    }
  }

  /**
   * Summaru: deletes the theme id.
   */
  deleteTheme(): void {
    localStorage.removeItem(this.storageName);
  }
}
