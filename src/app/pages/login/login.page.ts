import { Component, OnInit, ViewChild } from "@angular/core";
import { LoadingController, ToastController, IonSlides } from "@ionic/angular";

import { Keyboard } from "@ionic-native/keyboard/ngx";

import { User } from "src/app/interfaces/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, null) slides: IonSlides;

  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    public keyboard: Keyboard,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  async login() {
    await this.presentLoading();
    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      console.error(error);
      this.presentToast(error);
    } finally {
      this.loading.dismiss();
    }
  }

  mudarPagina(page) {
    if (page === "cadastro") {
      this.slides.slideNext();
    } else {
      this.slides.slidePrev();
    }
  }
  async register() {
    await this.presentLoading();
    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      console.error(error);
      this.presentToast(error);
    } finally {
      this.loading.dismiss();
    }
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Por favor, aguarde..."
    });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, // message: message, quando tem o msm nome pode abreviar
      duration: 2000
    });
    toast.present();
  }
}