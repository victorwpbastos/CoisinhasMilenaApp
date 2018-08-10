import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import {
	AngularFirestoreModule,
	AngularFirestore
} from 'angularfire2/firestore';
import { ProdutoService } from '../providers/produto-service/produto-service';

import { MyApp } from './app.component';

let firebaseConfig = {

};

@NgModule({
	declarations: [MyApp],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFirestoreModule.enablePersistence()
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp],
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		AngularFirestore,
		ProdutoService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {}
