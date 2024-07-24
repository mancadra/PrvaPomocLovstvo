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
  @Input() isCorrect: Boolean = false;
  constructor(private el: ElementRef, private render: Renderer2) {}
  @HostListener('click') answer() {
    if (this.isCorrect) {
      this.render.setStyle(this.el.nativeElement, 'border', '4px solid #0B7B09');
      this.render.setStyle(this.el.nativeElement, 'padding', '11px 31px');
    } else {
      this.render.setStyle(this.el.nativeElement, 'border', '4px solid #D8401F');
      this.render.setStyle(this.el.nativeElement, 'padding', '11px 31px');
    }
  }
}
