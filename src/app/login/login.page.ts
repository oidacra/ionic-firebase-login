import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  errorMessage: string = '';

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
  loginUser(value) {
    this.authService.loginUser(value).then(
      (res) => {
        // TODO: REMOVER
        console.log(res);
        this.errorMessage = '';
        this.navCtrl.navigateForward('/dashboard');
      },
      (err) => {
        this.errorMessage = err.message;
      }
    );
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }
  ngOnDestroy(){
    this.form.reset();
  }
}
