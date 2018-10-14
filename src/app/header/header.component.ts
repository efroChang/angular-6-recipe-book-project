import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}

  public onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe((response: Response) => {
        console.log(response);
      });
  }

  public onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  public onLogout() {
    this.authService.logout();
  }
}