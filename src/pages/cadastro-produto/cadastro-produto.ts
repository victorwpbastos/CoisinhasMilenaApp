import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController
} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import {
	ProdutoService,
	Produto
} from '../../providers/produto-service/produto-service';

@IonicPage()
@Component({
	selector: 'page-cadastro-produto',
	templateUrl: 'cadastro-produto.html'
})
export class CadastroProdutoPage {
	public produto: Produto;
	private isUpdating = false;

	constructor(
		private navController: NavController,
		private alertController: AlertController,
		private navParams: NavParams,
		private camera: Camera,
		public DomSanitizer: DomSanitizer,
		private produtoService: ProdutoService
	) {
		let produto = this.navParams.get('produto');

		if (produto) {
			this.produto = produto;
			this.isUpdating = true;
		}
	}

	async selecionarFoto() {
		let options: CameraOptions = {
			destinationType: this.camera.DestinationType.FILE_URI,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
		};

		try {
			this.produto.foto = await this.camera.getPicture(options);
		} catch (error) {
			console.error('Erro ao tirar a foto', error);
		}
	}

	atualizarProduto() {
		if (this.isUpdating) {
			this.produtoService.updateProduto(this.produto.key, this.produto);
			this.isUpdating = false;
		} else {
			this.produtoService.insertProduto(this.produto);
		}

		this.navController.pop();
	}

	apagarProduto() {
		if (this.produto.key) {
			this.alertController
				.create({
					title: 'Confirmação',
					message: `Confirma a remoção de <strong>${
						this.produto.nome
					}</strong>?`,
					buttons: [
						{
							text: 'Não',
							role: 'cancel'
						},
						{
							text: 'Sim',
							handler: () => {
								this.produtoService.removeProduto(
									this.produto.key
								);
								this.navController.pop();
							}
						}
					]
				})
				.present();
		}
	}
}
