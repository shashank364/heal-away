import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from './module';
import { EnquryFormComponent } from './enqury-form/enqury-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { FirebaseService } from './firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','./app-mediaquery.scss']
})
export class AppComponent {

}
