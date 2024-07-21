import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('toggleBtn') toggleBtn!: ElementRef;
  @ViewChild('toggleBtnIcon') toggleBtnIcon!: ElementRef;
  @ViewChild('dropDownMenu') dropDownMenu!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.toggleBtn.nativeElement.onclick = () => {
      this.dropDownMenu.nativeElement.classList.toggle('open');
      const isOpen = this.dropDownMenu.nativeElement.classList.contains('open');

      this.toggleBtnIcon.nativeElement.className = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
    };
  }
}
