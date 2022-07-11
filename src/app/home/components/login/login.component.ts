import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as dataRaw from '../../../core/user.json';
import { User } from '../../interface/user';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  listUser: User [] = [];
  loginForm = this.fb.group({
    email: ['',[Validators.required]],
    password: ['',[Validators.required]]
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    const {data} = (dataRaw);
    this.listUser = data;
    console.log(this.listUser);
  }

  ngOnDestroy(): void {
    console.log('🎳🎳🎳Salida');
  }

  async onLogin(){
    if(this.loginForm.valid){
      const {email, password} = this.loginForm.getRawValue();
      this.router.navigate(['admin']);
      // if (this.listUser.find(m => m.email == email && m.password == password)) {
      //   const toast = await this.toastController.create({
      //     message: 'Credenciales correctas.',
      //     duration: 2000,
      //   });
      //   toast.present();
      //   setTimeout(() => {
      //     this.router.navigate(['admin']);
      //   }, 5000);
      // }else{
      //   const toast = await this.toastController.create({
      //     message: '🔴🔴Error de autenticación 🔴🔴',
      //     duration: 2000,
      //   });
      //   toast.present();
      // }
    }
  }

}
