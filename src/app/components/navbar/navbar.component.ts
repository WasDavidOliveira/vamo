import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';

import { ActualpageService } from 'src/app/services/actualpage.service';

@Component({
  selector: 'navbar-home',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  currentPage = '';
  isMenuOpen = false;

  constructor(
    private actualPage: ActualpageService,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const toggleButton = this.elementRef.nativeElement.querySelector('.navbar-toggle');
    const aside = this.elementRef.nativeElement.querySelector('aside');
    const closeAsideButton = this.elementRef.nativeElement.querySelector('.aside-header .icon');

    if (toggleButton) {
      toggleButton.addEventListener('click', (e: any) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    if (closeAsideButton) {
      closeAsideButton.addEventListener('click', (e: any) => {
        e.preventDefault();
        this.closeMobileMenu();
      });
    }

    aside?.addEventListener('click', (e: any) => {
      if (e.target === aside) {
        this.closeMobileMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu(): void {
    const aside = this.elementRef.nativeElement.querySelector('aside');
    const toggleButton = this.elementRef.nativeElement.querySelector('.navbar-toggle');
    
    if (aside && toggleButton) {
      this.isMenuOpen = !this.isMenuOpen;
      
      if (this.isMenuOpen) {
        aside.classList.add('active');
        toggleButton.classList.add('active');
        toggleButton.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        aside.classList.remove('active');
        toggleButton.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu(): void {
    const aside = this.elementRef.nativeElement.querySelector('aside');
    const toggleButton = this.elementRef.nativeElement.querySelector('.navbar-toggle');
    
    if (aside && toggleButton) {
      this.isMenuOpen = false;
      aside.classList.remove('active');
      toggleButton.classList.remove('active');
      toggleButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  ngOnInit() {
    this.actualPage.getCurrentPage().subscribe(page => {
      this.currentPage = page;
    });
  }
}
