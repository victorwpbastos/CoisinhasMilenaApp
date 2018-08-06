import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ProdutoService } from '../../providers/produto-service/produto-service';

@IonicPage()
@Component({
	selector: 'page-produtos',
	templateUrl: 'produtos.html'
})
export class ProdutosPage {
	public produtos: any[] = [];

	constructor(
		private produtoService: ProdutoService,
		private navController: NavController,
		public DomSanitizer: DomSanitizer
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
		this.navController.push('CadastroProdutoPage');
	}

	editarProduto(produto) {
		this.navController.push('CadastroProdutoPage', { produto });
	}
}
