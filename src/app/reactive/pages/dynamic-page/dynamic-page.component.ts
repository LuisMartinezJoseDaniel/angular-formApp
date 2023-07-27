import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  // Boton de agregar favorito
  public newFavorite: FormControl = new FormControl('', Validators.required);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset();
    //* Reasignar el formArray
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onAddFavorite(): void {
    if (this.newFavorite.invalid) {
      return;
    }
    const newGame = this.newFavorite.value;
    // Sin Form Builder
    // this.favoriteGames.push(new FormControl(newGame, Validators.required));
    this.favoriteGames.push(
      //* Agregamos un nuevo control al array
      this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset(); //* Resetear el campo
  }

  //* Getter para poder asignarlo al html directamente
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  // Si hay errores y el elemento ha sido tocado
  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
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
}
