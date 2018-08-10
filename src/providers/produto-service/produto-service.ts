import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	AngularFirestore,
	AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable()
export class ProdutoService {
	private collection: AngularFirestoreCollection<any>;

	constructor(private afs: AngularFirestore) {
		this.collection = this.afs.collection<any>('produtos');
	}

	getAll(): Observable<any> {
		return this.collection.snapshotChanges();
	}

	insertProduto(produto: any) {
		this.collection.add(produto);
	}

	updateProduto(id: string, produto: any) {
		delete produto.id;

		this.collection.doc(id).update(produto);
	}

	removeProduto(id: string) {
		this.collection.doc(id).delete();
	}
}
