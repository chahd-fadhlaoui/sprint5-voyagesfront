  import { Injectable } from '@angular/core';
  import { Voyage } from '../model/voyage.model';
  import { Observable } from 'rxjs';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Classe } from '../model/Classe.model';
  import { AuthService } from './auth.service';
import { ClasseWrapper } from '../model/classeWrapped.model';
  const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
  @Injectable({
    providedIn: 'root'
  })
  export class VoyageService {

      apiURL: string = 'http://localhost:8082/voyage/api';
      apiURLCl: string = 'http://localhost:8082/voyage/api/cl';


    voyages!: Voyage[]; // un tableau de voyages
  // classes!: Classe[];

    constructor(private http : HttpClient,
      private authService: AuthService ) {
    /* this.voyages = [
        { idVoyage: 1, nomVoyage: "Voyage en France", prixVoyage: 2000.50, dateVoyage: new Date("01/14/2019") },
        { idVoyage: 2, nomVoyage: "Séjour à Bali", prixVoyage: 3000, dateVoyage: new Date("12/17/2020") },
        { idVoyage: 3, nomVoyage: "Aventure en Nouvelle-Zélande", prixVoyage: 3500.75, dateVoyage: new Date("02/20/2022") }
      ];*/
    }
    listeVoyage(): Observable<Voyage[]>{
      let jwt = this.authService.getToken();
       jwt = "Bearer "+jwt; 
       let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<Voyage[]>(this.apiURL+"/all",{headers:httpHeaders});
      }
      
      ajouterVoyage( voya: Voyage):Observable<Voyage>{
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.post<Voyage>(this.apiURL+"/addvoya", voya, {headers:httpHeaders});       
       }
        

        supprimerVoyage(id: number) {
          const url = `${this.apiURL}/delvoya/${id}`;
         let jwt = this.authService.getToken();
         jwt = "Bearer "+jwt;
         let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
         return this.http.delete(url, {headers:httpHeaders});
        }
        

        consulterVoyage(id: number): Observable<Voyage> {
          const url = `${this.apiURL}/getbyid/${id}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.get<Voyage>(url,{headers:httpHeaders});
          }
    trierVoyages() {
      this.voyages = this.voyages.sort((v1, v2) => {
        if (v1.idVoyage! > v2.idVoyage!) {
          return 1;
        }
        if (v1.idVoyage! < v2.idVoyage!) {
          return -1;
        }
        return 0;
      });
    }

    updateVoyage(voya :Voyage) : Observable<Voyage>
  {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Voyage>(this.apiURL+"/updatevoya", voya, {headers:httpHeaders});  }


  listeClasses():Observable<Classe[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Classe[]>(this.apiURLCl,{headers:httpHeaders}
    );
  }
    
    rechercherParClasse(idCl: number): Observable<Voyage[]> {
      let token = this.authService.getToken();
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.get<Voyage[]>(`${this.apiURL}/voyagescl/${idCl}`, { headers });
    }
    rechercherParNom(nom: string):Observable< Voyage[]> {
      const url = `${this.apiURL}/voyagesByName/${nom}`;
      return this.http.get<Voyage[]>(url);
      }
    
  }