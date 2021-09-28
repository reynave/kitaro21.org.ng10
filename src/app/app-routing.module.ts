import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { ReloginComponent } from './login/relogin/relogin.component'; 
import { TransactionComponent } from './transaction/transaction.component'; 
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ActivationComponent } from './activation/activation.component';   
import { InboxComponent } from './inbox/inbox.component';
import { AdminComponent } from './admin/admin.component'; 
import { VerifyComponent } from './profile/verify/verify.component'; 
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { EaFormComponent } from './ea-form/ea-form.component';
import { ReferalComponent } from './referal/referal.component';
import { MembershipComponent } from './membership/membership.component';
import { UserComponent } from './user/user.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ProfitSharingComponent } from './profit-sharing/profit-sharing.component';
import { RebateComponent } from './rebate/rebate.component';
import { MembershipActivationComponent } from './membership/membership-activation/membership-activation.component';
import { EaFormListComponent } from './ea-form/ea-form-list/ea-form-list.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'relogin', component: ReloginComponent },
  { path: 'membership', component:  MembershipComponent },
  { path: 'paymentConfirm', component:  PaymentConfirmComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/resetpassword', component: ResetPasswordComponent },
  { path: 'activation/:token', component: ActivationComponent },
  { path: 'admin/loki', component: AdminComponent },
  { path: 'membership/activation', component: MembershipActivationComponent,  },
  

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data:{active:"home"} },
  { path: 'eaForm', component: EaFormListComponent, canActivate: [AuthGuard] , data:{active:"eaForm"}},
  { path: 'eaForm/draft/:id', component: EaFormComponent, canActivate: [AuthGuard] , data:{active:"eaForm"}},


  { path: 'familyTree', component: FamilyTreeComponent, canActivate: [AuthGuard] , data:{active:"familyTree"}},
  { path: 'referal', component: ReferalComponent, canActivate: [AuthGuard] , data:{active:"referal"}},
  { path: 'user/detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] , data:{active:"user"}},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] , data:{active:"user"}},
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard], data:{active:"inbox"} },



  { path: 'profitSharing', component: ProfitSharingComponent, canActivate: [AuthGuard] , data:{active:"profitSharing"}},
  { path: 'rebate', component: RebateComponent, canActivate: [AuthGuard] , data:{active:"rebate"}},
  { path: 'salesReport', component: SalesReportComponent, canActivate: [AuthGuard] , data:{active:"salesReport"}},
  

  { path: 'genaralTrans', component: TransactionComponent, canActivate: [AuthGuard] , data:{active:"genaralTrans"}},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data:{active:"profile"} },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard], data:{active:"profile"} },
  { path: 'profile/verify', component: VerifyComponent, canActivate: [AuthGuard], data:{active:"profile"} },

 
  { path: 'notfound', component: NotFoundComponent },

  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
