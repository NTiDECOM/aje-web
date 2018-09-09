import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[trabalhador]'
})
export class SpanTrabalhadorDirective {

  @Input('trabalhador') controlTrabalhador: string;

  constructor() { }

}
