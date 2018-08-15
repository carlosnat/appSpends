import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  userForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });


  constructor(
    public navCtrl: Nav,
    public navParams: NavParams,
    private http: HttpClient,
    private fb: FormBuilder,
    public toastCtrl: ToastController) {}

  userLogin(){
    if(this.userForm.valid){
      this.http.post('http://localhost:5000/api/user/login', this.userForm.value).subscribe(
        (response) => {
          this.navCtrl.setRoot(HomePage);
        },
        (reject) => {
          console.log(reject);
          this.presentToast('Error in login, please check');
          this.userForm.reset();
        });
    }
  }

  userSignUp(){
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
