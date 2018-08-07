import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController } from 'ionic-angular';
import { ProdutoService } from '../../providers/produto-service/produto-service';

@IonicPage()
@Component({
	selector: 'page-produtos',
	templateUrl: 'produtos.html'
})
export class ProdutosPage {
	public produtos: any[] = [];
	private allProdutos: any[] = [];

	constructor(
		private modalController: ModalController,
		private loadingController: LoadingController,
		private produtoService: ProdutoService
	) {
		this.populateProdutos();
	}

	populateProdutos() {
		let loading = this.loadingController.create({
			content: 'Carregando produtos...'
		});

		loading.present();

		this.produtoService.getAll().subscribe(produtos => {
			this.produtos = this.allProdutos = produtos.map(p => {
				return { key: p.key, ...p.payload.val() };
			});

			loading.dismiss();
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

	buscar(value) {
		if (!value || !this.produtos.length) {
			return (this.produtos = this.allProdutos);
		}

		this.produtos = this.allProdutos.filter(
			p =>
				p.nome
					.toString()
					.toLowerCase()
					.indexOf(value) !== -1 ||
				p.descricao
					.toString()
					.toLowerCase()
					.indexOf(value) !== -1 ||
				p.preco
					.toString()
					.toLowerCase()
					.indexOf(value) !== -1
		);
	}
}
