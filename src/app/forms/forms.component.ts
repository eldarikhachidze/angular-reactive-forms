import {Component, OnInit,} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {

  form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    userContactInfo: new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email]),
      phone:new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(12),
        Validators.pattern('[0-9]+')
      ]),
    }),
    userResource: new FormGroup({
      github:new FormControl('', Validators.required),
      linkedin:new FormControl('', Validators.required),
    }),
    active: new FormControl('', Validators.requiredTrue),
    experience: new FormArray([
      new FormGroup({
        company: new FormControl(''),
        years: new FormControl('',[
          Validators.minLength(4),
          Validators.maxLength(4)
        ])
      })
    ])
  });

  get experienceFormArray() {
    return <FormArray>this.form.get('experience')
  }

  addExperience() {
    this.experienceFormArray.push(new FormGroup({
      company: new FormControl('', Validators.required),
      years: new FormControl('', Validators.required)
    }))
  }

  submit() {
    console.log(this.form.value)
  }

  removeExperience(i: number) {
    this.experienceFormArray.removeAt(i)

  }
}
