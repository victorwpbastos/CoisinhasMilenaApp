import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { ProdutoService } from '../../providers/produto-service/produto-service';

@IonicPage()
@Component({
	selector: 'page-produtos',
	templateUrl: 'produtos.html'
})
export class ProdutosPage {
	public produtos: any[] = [];

	constructor(
		private modalController: ModalController,
		private produtoService: ProdutoService
	) {
		this.produtoService.getAll().subscribe(produtos => {
			this.produtos = produtos.map(p => {
				return { key: p.key, ...p.payload.val() };
			});
		});
	}

	converteParaReal(valor) {
		valor = valor.toString().replace(',', '.');

		return Number(valor).toLocaleString('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});
	}

	adicionarProduto() {
		this.modalController.create('CadastroProdutoPage').present();
	}

	editarProduto(produto) {
		this.modalController
			.create('CadastroProdutoPage', { produto })
			.present();
	}
}
