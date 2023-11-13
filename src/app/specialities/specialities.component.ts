import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss']
})
export class SpecialitiesComponent implements OnInit {

  public section:string = ''

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.section = params['section'];
      if (this.section) {
        console.log('Section ID:', this.section);
      }
    });
  }

  getSectionTemplate(): string {
    switch (this.section) {
      case 'Cardiology':
        return this.section;
      case 'Oncology':
        return this.section;
      case 'Neurology':
        return this.section;
      case 'Transplants':
        return this.section;
      case 'PlasticSurgery':
        return this.section;
      case 'RoboticSurgery':
        return this.section;
      case 'Geriatric':
        return this.section;
      case 'Gastroenterology':
        return this.section;
      case 'ENT':
        return this.section;
      case 'Pediatric':
        return this.section;
      case 'Dental':
        return this.section;
      default:
        return 'default-template';
    }
  }

}
