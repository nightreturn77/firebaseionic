import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Produto } from './../../interfaces/produto';
import { ProdutoService } from './../../services/produto.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    private products = new Array<Produto>();
    private productSubscription: Subscription;




  constructor(private produtoService: ProdutoService, private authService: AuthService, private toastCtrl: ToastController) {
    this.productSubscription = this.produtoService
    .getProducts()
    .subscribe(data =>{ 
      this.products = data;
    })
   }

  ngOnInit() {
  }

  ngOnDestroy(){ 
    this.productSubscription.unsubscribe();
  }

  async logout(){
    try{ 
      await this.authService.logout()

    }catch (error){ 
      console.error(error)
    }
  }


  async deleteProduct(id: string){ 
    try{ 
      await this.produtoService.deleteProduct(id);

    }catch(error){ 
      this.presentToast("erro ao tentar deletar");
    }
  }


  async presentToast(message: string){ 
    const toast = await this.toastCtrl.create({message, duration: 2000});
    toast.present();
  }

}
