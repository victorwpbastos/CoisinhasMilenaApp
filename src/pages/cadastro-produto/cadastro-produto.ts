import { Component } from '@angular/core';
import {
	IonicPage,
	NavParams,
	AlertController,
	ViewController
} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProdutoService } from '../../providers/produto-service/produto-service';

@IonicPage()
@Component({
	selector: 'page-cadastro-produto',
	templateUrl: 'cadastro-produto.html'
})
export class CadastroProdutoPage {
	public produto: any = { nome: '', descricao: '', preco: '', foto: '' };
	private isUpdating = false;

	constructor(
		private viewController: ViewController,
		private alertController: AlertController,
		private navParams: NavParams,
		private camera: Camera,
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
			destinationType: this.camera.DestinationType.DATA_URL,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
		};

		try {
			let data = await this.camera.getPicture(options);

			this.produto.foto = `data:image/png;base64,${data}`;
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

		this.close();
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

								this.close();
							}
						}
					]
				})
				.present();
		}
	}

	close() {
		this.viewController.dismiss();
	}
}
