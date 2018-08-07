import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class ProdutoService {
	private list: AngularFireList<any>;

	constructor(private adfb: AngularFireDatabase) {
		this.list = this.adfb.list('produtos');
	}

	getAll(): Observable<any> {
		return this.list.snapshotChanges();
	}

	insertProduto(produto: any) {
		this.list.push(produto);
	}

	updateProduto(key: string, produto: any) {
		delete produto.key;

		this.list.update(key, produto);
	}

	removeProduto(key: string) {
		this.list.remove(key);
	}
}
