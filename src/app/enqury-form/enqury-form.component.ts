import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-enqury-form',
  templateUrl: './enqury-form.component.html',
  styleUrls: ['./enqury-form.component.scss']
})
export class EnquryFormComponent implements OnInit {

  formGroup: FormGroup;

  @Output() formSubmitted = new EventEmitter<any>();
  @Output() closeForm = new EventEmitter<void>();
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EnquryFormComponent>
  )
  {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmitted.emit(this.formGroup.value);
      this.dialogRef.close(this.formGroup.value);
    }
  }

  onClose() {
    this.formGroup.reset();
    this.dialogRef.close();
  }

}
