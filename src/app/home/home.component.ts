import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from '../module';
import { EnquryFormComponent } from '../enqury-form/enqury-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { FirebaseService } from '../firebase.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as Hammer from 'hammerjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','./home-mediaquery.scss'],
  animations: [
    trigger('slideAnimation', [
        state('in', style({ transform: 'translateX(0)', opacity: 1 })),
        transition(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('1s ease-in-out')
        ])
    ])
]
})
export class HomeComponent implements OnInit {

  title = 'HealAway';

  menuItems: MenuItem[] = [
    { label: 'Specialities', link: '/specialities' },
    { label: 'Why Choose HealAway?', link: '/why-choose-healaway' },
    { label: 'Services', link: '/services' }
  ];

  isFormOpen = true;

  specialties = [
    { icon: 'assets/icons/cardiology.png', label: 'Cardiology', sectionId: 'Cardiology' },
    { icon: 'assets/icons/oncology.png', label: 'Oncology', sectionId: 'Oncology' },
    { icon: 'assets/icons/neurology.png', label: 'Neurology', sectionId: 'Neurology' },
    { icon: 'assets/icons/transplants.png', label: 'Transplants', sectionId: 'Transplants' },
    { icon: 'assets/icons/plastic surgery.png', label: 'Plastic Surgery', sectionId: 'PlasticSurgery' },
    { icon: 'assets/icons/robotic surgery.png', label: 'Robotic Surgery', sectionId: 'RoboticSurgery' },
    { icon: 'assets/icons/geriatric.png', label: 'Geriatric', sectionId: 'Geriatric' },
    { icon: 'assets/icons/Gastroenterology.png', label: 'Gastroenterology', sectionId: 'Gastroenterology' },
    { icon: 'assets/icons/ENT.png', label: 'ENT', sectionId: 'ENT' },
    { icon: 'assets/icons/orthopedics.png', label: 'Orthopedics', sectionId: 'Orthopedics' },
    { icon: 'assets/icons/pediatric.png', label: 'Pediatric', sectionId: 'Pediatric' },
    { icon: 'assets/icons/dental.png', label: 'Dental', sectionId: 'Dental' },

    // Add the other specialties here
  ];

items = [
  {
    header: "Holistic Care",
    body: "We're not just focused on medical procedures; we're invested in your overall well-being. Our packages encompass not only world-class treatments but also comfortable accommodation, nourishing meals, and even curated sightseeing experiences tailored to your preferences."
  },
  {
    header: "Quality Assurance",
    body: "We partner with only the most reputable and accredited hospitals, ensuring you receive the highest standard of care. Our extensive network allows us to match you with specialists who excel in your specific medical needs."
  },
  {
    header: "Customized Packages",
    body: "No two patients are the same, which is why no two Heal Away packages are identical. We work closely with you to understand your unique requirements, tailoring a package that suits you perfectly."
  },
  {
    header: "Affordable Excellence",
    body: "Quality healthcare doesn't have to come at a premium. We've meticulously designed our packages to offer top-tier treatment at a cost that won't burden your finances."
  },
  {
    header: "Comprehensive Support",
    body: "From the moment you arrive in a new country to the day you return home, we're by your side. Our team ensures all your needs are met, be it transportation, translation services, or any other logistical support you require."
  },
  {
    header: "Memorable Experience",
    body: "While your primary focus is on your health, we believe your journey should be memorable for all the right reasons. We offer opportunities to explore and appreciate the culture and sights of your host country, turning your medical trip into a holistic experience."
  },
];
introText: string = "Heal Away isn't just a medical travel company; we're your dedicated partner in your journey towards better health. We understand that seeking medical treatment abroad can be a daunting prospect, which is why we go above and beyond to provide a comprehensive and tailored experience.";
closingText: string = "Choosing Heal Away means entrusting your health and well-being to a team that genuinely cares. We're here to guide you, support you, and ensure your journey towards better health is as smooth and comfortable as possible. Let us take care of the details, so you can focus on what truly matters – your recovery and well-being.";

currentIndex: number = 0;
intervalDuration = 5000;
autoScrollEnabled = true;

  @ViewChild('sidenav', { static: true }) sidenav!: MatDrawer;

  showScrollButton = true;
  isEnquiryFormOpen = false;
  isSticky = true;


  constructor(private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private fireBaseService:FirebaseService, private elRef:ElementRef) {
  }


  // Add a listener for the window scroll event
  ngOnInit() {
    this.startAutoScroll();
  }

  ngAfterViewInit() {
    this.initHammer();
  }

  initHammer() {
    const el = this.elRef.nativeElement.querySelector('.carousel');
    const hammer = new Hammer(el);
    
    hammer.on('swipeleft', () => this.onSwipedLeft());
    hammer.on('swiperight', () => this.onSwipedRight());
  }

  startAutoScroll() {
    setInterval(() => {
      if (this.autoScrollEnabled) {
        this.goToNextSlide();
      }
    }, this.intervalDuration);
  }

  goToNextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  onSwipedLeft() {
    this.goToNextSlide();
  }

  onSwipedRight() {
    this.goToPreviousSlide();
  }
  
  goToPreviousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }
  


  onEnquiryFormOpen() {
    const dialogRef = this.dialog.open(EnquryFormComponent, {
      width: '20rem', // Adjust the width as needed
      panelClass: 'enquiry-dialog' // Apply additional CSS class to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form submitted:', result);
        this.fireBaseService.saveFormData(result);
        // Do something with the submitted form data
        this.fireBaseService.getUserData().subscribe((res) =>{
          console.log(res);
        });
      }
    });
   }

  onLogoClick() {
    console.log('logo Clicked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/']);
  }


  scrollToSection(sectionId: string) {
    const sectionElement = document.getElementById(sectionId);
    this.router.navigate(['specialities'], { queryParams: { section: sectionId } });
  }
  scrollToSpecialities() {
    const specialitiesSection = document.getElementById('specialitiesSection');
    if (specialitiesSection) {
      specialitiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.router.navigate([], { fragment: 'specialitiesSection' });
    }
  }
  scrollToAbout() {
    const specialitiesSection = document.getElementById('aboutsection');
    if (specialitiesSection) {
      specialitiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.router.navigate([], { fragment: 'aboutsection' });
    }
  }
  scrollToServices() {
    const specialitiesSection = document.getElementById('serviceSection');
    if (specialitiesSection) {
      specialitiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.router.navigate([], { fragment: 'serviceSection' });
    }
  }
  scrollToContact() {
    const specialitiesSection = document.getElementById('contactSection');
    if (specialitiesSection) {
      specialitiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.router.navigate([], { fragment: 'contactSection' });
    }
  }
  handleSpecialitySideBar(){
    this.sidenav.close();
    this.scrollToSpecialities();
  }
  handleAboutSideBar(){
    this.sidenav.close();
    this.scrollToAbout();
  }
  handleServiceSideBar(){
    this.sidenav.close();
    this.scrollToServices();
  }

  handleContactSideBar(){
    this.sidenav.close();
    this.scrollToContact();
  }


    // Function to scroll to the top of the page
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigate(['/']);
    }
    // Show the button when the user scrolls down
    @HostListener('window:scroll', [])
    onWindowScroll() {
      // const yOffset = window.scrollY;
      // const isLandingPage = window.location.pathname === '/' || window.location.pathname === '/home';

      // // You can adjust the offset value based on when you want the button to appear
      // this.showScrollButton = !isLandingPage && yOffset > 300;
    }

}
