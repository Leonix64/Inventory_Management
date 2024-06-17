import { Component, OnInit } from '@angular/core';
import { RegisterService, UserData } from '../services/register.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userData: UserData = {
    name: '',
    last_name: '',
    age: null,
    phone: '',
    gender: '',
    password: '',
  };

  constructor(
    private registerService: RegisterService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  registerUser() {
    this.registerService.registerUser(this.userData).subscribe(
      (response) => {
        this.presentToast('User successfully registered');
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
