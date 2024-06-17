import { Component, OnInit } from '@angular/core';
import { LoginService, LoginData } from '../services/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData: LoginData = {
    name: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  loginUser() {
    this.loginService.LoginUser(this.loginData).subscribe(
      (response) => {
        this.presentToast('User successfully logged in');
        console.log(response);
      },
      (error) => {
        this.presentToastError('Review your credentials and try again');
        console.log(error);
      }
    )
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  async presentToastError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
}
