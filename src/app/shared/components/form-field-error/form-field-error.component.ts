import { Component, OnInit, Input } from '@angular/core';
import { FormControl }              from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})

export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl : FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage() : string | null {
    if( this.mustShowErrorMessage() ){
      return this.getErrorMessage();
    }
    else {
      return null;
    }
  }

  private getErrorMessage() : string | null {
    if( this.formControl.errors.required )
      return "Dado Obrigatório";

    else if ( this.formControl.errors.email )
      return "Formato de e-mail inválido";

    else if ( this.formControl.errors.minlength ) {
      const  requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Deve ter no minímo ${requiredLength} caracteres `;
    }

    else if ( this.formControl.errors.maxlength ) {
      const  requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `Deve ter no máximo ${requiredLength} caracteres `;
    }      
  } 

  private mustShowErrorMessage(): boolean {
    return this.formControl .invalid && this.formControl.touched;
  }

}
