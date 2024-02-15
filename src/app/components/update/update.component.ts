import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UserInterface } from '../../core/interfaces/user';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent implements OnInit {
  @Input() user: UserInterface = {} as UserInterface;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() emitNewUser: EventEmitter<UserInterface> =
    new EventEmitter<UserInterface>();

  copyformUser: UserInterface = {} as UserInterface;
  formUser: FormGroup = this.createForm();
  foto: string = '';
  fileselected: boolean = false;

  private file_img: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formUser.patchValue(this.user);
    this.copyformUser = { ...this.user };
  }

  get validateForm(): boolean {
    return this.formUser.valid || this.fileselected;
  }

  createForm() {
    return (this.formUser = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      profession: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, this.phoneNumberValidator]],
      email: ['', [Validators.email, Validators.required]],
      photo: [''],
    }));
  }

  saveUser(): void {
    if (this.valid_charge() || this.fileselected) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Toda la informacion es correcta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro!',
        position: 'top-end',
        toast: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.emitNewUser.emit(this.formUser.value);
          this.formUser.reset();
          this.fileselected = false;
          this.file_img = null;
          this.fileInput.nativeElement.value = '';
        }
      });
    }
  }

  isFieldInvalid(fieldName: string) {
    const field = this.formUser.get(fieldName);
    return field?.invalid && (field.dirty || field.touched);
  }

  onFileSelected(event: any) {
    this.file_img = event.target.files[0];
    this.getBase64(this.file_img).then((data: any) => {
      this.formUser.get('photo')?.setValue(data);
    });
    this.fileselected = true;
  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const phoneNumber = control.value;
    if (!phoneNumber || phoneNumber === '') {
      return null;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }

    return null;
  }

  valid_charge(): boolean {
    let hasChanges = false;
    Object.keys(this.formUser.controls).forEach((key) => {
      const currentValue = this.formUser.controls[key].value;
      const initialValue = this.copyformUser[key as keyof UserInterface];
      if (currentValue !== initialValue) {
        hasChanges = true;
      }
    });
    return hasChanges;
  }
}
