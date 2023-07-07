import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const product = {
  name: 'RTX 4060',
  price: 2000,
  inStorage: 10,
};

@Component({
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent implements OnInit {
  // Forma tradicional
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  //Con Form Builder
  public myForm: FormGroup = this.fb.group({
    // [value, validadores, validadores asincronos]
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //Asignar valores al momento de cargar la pagina
    // this.myForm.reset(product);
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    // Recuperar los errores en el input reactivo
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} characters`;
      }
    }
    return null;
  }

  onSave(): void {
    //Revisar que sea valido
    if (this.myForm.invalid) return;

    //Restablecer el formulario y asignar valores
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
