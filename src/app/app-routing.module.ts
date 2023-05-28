import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: LayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)},
      {path: 'movimentacao', loadChildren: () => import('./pages/movimentacao-estoque/movimentacao-estoque.module').then(me => me.MovimentacaoEstoqueModule)}
    ]
  },
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
