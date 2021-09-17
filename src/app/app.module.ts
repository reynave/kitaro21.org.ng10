import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { NgxLoadingModule } from 'ngx-loading';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LeftsideComponent } from './global/leftside/leftside.component';
import { TopsideComponent } from './global/topside/topside.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './global/footer/footer.component';
import { allIcons } from 'angular-feather/icons';
import { TreeModule } from '@circlon/angular-tree-component';

import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReloginComponent } from './login/relogin/relogin.component'; 
import { MemberComponent } from './member/member.component';
import { TransactionComponent } from './transaction/transaction.component'; 
import {AutocompleteLibModule} from 'angular-ng-autocomplete'; 
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ActivationComponent } from './activation/activation.component'; 
import { ProfitSharingComponent } from './profit-sharing/profit-sharing.component'; 
import { CommissionSponsorComponent } from './commission-sponsor/commission-sponsor.component';
import { CommissionPassupComponent } from './commission-passup/commission-passup.component';
import { CommissionPairingComponent } from './commission-pairing/commission-pairing.component';
import { CommissionRewardComponent } from './commission-reward/commission-reward.component';
import { MemberParentComponent } from './member/member-parent/member-parent.component';  
import { PairingDetailComponent } from './commission-pairing/pairing-detail/pairing-detail.component'; 

import {ConnectionServiceModule} from 'ngx-connection-service';
import { InboxComponent } from './inbox/inbox.component';
import { AdminComponent } from './admin/admin.component';
import { SecurityKeyComponent } from './security-key/security-key.component';
import { KeyModalComponent } from './security-key/key-modal/key-modal.component';
import { VerifyComponent } from './profile/verify/verify.component';
import { ReadonlyComponent } from './readonly/readonly.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { EaFormComponent } from './ea-form/ea-form.component';  
import { SignaturePadModule } from 'ngx-signaturepad';
import { ReferalComponent } from './referal/referal.component';
import { MembershipComponent } from './membership/membership.component';
import { UserComponent } from './user/user.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 0,
  prefix: "Rp ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LeftsideComponent,
    TopsideComponent,
    NotFoundComponent,
    FooterComponent,
    ReloginComponent, 
    MemberComponent,
    TransactionComponent, 
    ProfileComponent,
    ProfileEditComponent,
    ActivationComponent, 
    ProfitSharingComponent, 
    CommissionSponsorComponent,
    CommissionPassupComponent,
    CommissionPairingComponent,
    CommissionRewardComponent,
    MemberParentComponent, 
     PairingDetailComponent, InboxComponent, AdminComponent, SecurityKeyComponent, KeyModalComponent, VerifyComponent, ReadonlyComponent, ResetPasswordComponent, FamilyTreeComponent, EaFormComponent, ReferalComponent, MembershipComponent, UserComponent, PaymentConfirmComponent, 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CurrencyMaskModule,
    FormsModule,
    FeatherModule.pick(allIcons),
    AutocompleteLibModule,
    NgxLoadingModule.forRoot({}),
    ConnectionServiceModule,
    TreeModule,  
    SignaturePadModule,
  ],
  exports: [
    FeatherModule
  ],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
