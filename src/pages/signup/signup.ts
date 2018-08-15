import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    lastName: ['', Validators.required],
    avatar: [''],
    birthdate: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private fb: FormBuilder,
    public toastCtrl: ToastController) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  newUser(){
    if(this.userForm.valid){
      this.http.post('http://localhost:5000/api/user/signup', this.userForm.value).subscribe(
        (response) => {
          this.userForm.reset();
          this.navCtrl.pop();
          this.presentToast('User created successfully');
        }, (reject) => {
          this.presentToast(reject.error.error_msg)
        }
      );
    }
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
