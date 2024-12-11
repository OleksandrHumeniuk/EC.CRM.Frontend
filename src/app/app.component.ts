import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from "./containers/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, HeaderComponent, RouterModule]
})
export class AppComponent implements OnInit {
  isBackgroundWhite: boolean = false;

  constructor(private router: Router) {}
  
  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.router.url.startsWith('/students')) {
        this.isBackgroundWhite = true;
      } else if (this.router.url.startsWith('/find-mentor')) {
        this.isBackgroundWhite = true;
      }
    });
  }
}

