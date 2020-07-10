import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    email: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'Favor ingrese un email válido.' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida.' },
      {
        type: 'minlength',
        message: 'La contraseña debe contener como mínimo 5 caracteres.',
      },
    ],
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });
  }

  tryRegister(value) {
    this.authService.registerUser(value).then(
      (res) => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage =
          'Su cuenta ha sido creada. Por favor autentiquese';
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
  ngOnDestroy(){
    this.form.reset();
  }
}
