import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html'
})
export class TabsPage {
	produtosRoot = 'ProdutosPage';
	encomendasRoot = 'EncomendasPage';
	anunciosRoot = 'AnunciosPage';

	constructor(public navCtrl: NavController) {}
}
