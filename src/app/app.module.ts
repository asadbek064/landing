import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { JoinBetaComponent } from './join-beta/join-beta.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContainerHowItWorksComponent } from './home/container-how-it-works/container-how-it-works.component';
import { MobileResizeService } from './shared/services/mobile-resize.service';
import { ValidateEmailService } from './shared/services/validateEmail.service';
import { SearchService } from './shared/services/search.service';
import { AuthService } from './shared/services/auth.service';
import { LearnMoreBtnComponent } from './components/learn-more-btn/learn-more-btn.component';
import { JoinBarBtnComponent } from './components/join-bar-btn/join-bar-btn.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturesComponent } from './features/features.component';
import { RegisterBusinessComponent } from './join-beta/register-business/register-business.component';
import { RegisterShopperComponent } from './join-beta/register-shopper/register-shopper.component';
import { RegisterNonprofitComponent } from './join-beta/register-nonprofit/register-nonprofit.component';
import { ContainerBusinessComponent } from './home/container-business/container-business.component';
import { ContainerNonprofitComponent } from './home/container-nonprofit/container-nonprofit.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { DialogContentEsignBusinessDialog } from './join-beta/register-business/register-business.component';
import { DialogContentEsignNonprofitDialog } from './join-beta/register-nonprofit/register-nonprofit.component';
import { ShopperMatcardComponentComponent } from  './home/shopper-matcard-component/shopper-matcard-component.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    JoinBetaComponent,
    BannerComponent,
    ContainerHowItWorksComponent,
    LearnMoreBtnComponent,
    JoinBarBtnComponent,
    FooterComponent,
    FeaturesComponent,
    RegisterBusinessComponent,
    RegisterShopperComponent,
    RegisterNonprofitComponent,
    ContainerBusinessComponent,
    ContainerNonprofitComponent,
    ContactUsComponent,
    DialogContentEsignBusinessDialog,
    DialogContentEsignNonprofitDialog,
    ShopperMatcardComponentComponent,
    CarouselComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
	  FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCarouselModule.forRoot(),
  ],
  providers: [
              MobileResizeService, 
              ValidateEmailService, 
              AuthService, 
              SearchService 
              ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitzer: DomSanitizer
	  ) {
		// Importing Custom Logos
		this.matIconRegistry.addSvgIcon(
		  'logo-pieshares',
		  this.domSanitzer.bypassSecurityTrustResourceUrl('assets/svg/icons/logo-pieshares.svg')
		);
		this.matIconRegistry.addSvgIcon(
		  'logo-pieshares-notext',
		  this.domSanitzer.bypassSecurityTrustResourceUrl('assets/svg/icons/logo-pieshares-notext.svg')
		);
	}
}
