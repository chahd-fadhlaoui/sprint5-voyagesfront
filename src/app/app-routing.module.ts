import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVoyageComponent } from './add-voyage/add-voyage.component';
import { VoyagesComponent } from './voyages/voyages.component';
import { UpdateVoyageComponent } from './update-voyage/update-voyage.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { VoyageGuard } from './voyage.guard';
import { RechercheParClasseComponent } from './recherche-par-classe/recherche-par-classe.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  { path: 'Voyages', component: VoyagesComponent },
  {path: "add-voyage", component : AddVoyageComponent,canActivate:[VoyageGuard]},
  {path: "updateVoyage/:id", component: UpdateVoyageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: "rechercheParClasse", component : RechercheParClasseComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path:'register',component:RegisterComponent},

  {path: "", redirectTo: "voyages", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }