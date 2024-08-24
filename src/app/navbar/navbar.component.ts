import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SidebarService } from '../patient-search/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule ,FormsModule , CommonModule] , 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isSidebarOpen: boolean = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarOpen$.subscribe(state => {
      this.isSidebarOpen = state;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar(); // Toggle the sidebar state
  }
}