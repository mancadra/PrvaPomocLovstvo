import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
})
export class ChangeBgDirective {
  isSelected: boolean = false;

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('click') answer() {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.render.setStyle(this.el.nativeElement, 'border', '4px solid #b29d76');
      this.render.setStyle(this.el.nativeElement, 'padding', '11px 31px');
    } else {
      this.render.removeStyle(this.el.nativeElement, 'border');
      this.render.setStyle(this.el.nativeElement, 'padding', '15px 35px'); // Original padding
    }
  }
}
