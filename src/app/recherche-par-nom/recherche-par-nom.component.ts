import { Component, OnInit } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../services/voyage.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {
nomVoyage!:string;
voyages!:Voyage[];
allVoyages!:Voyage[];
searchTerm!:string;
  constructor(private voyageService: VoyageService) { }

  ngOnInit(): void {
    this.voyageService.listeVoyage().subscribe(voyas => {
      console.log(voyas);
      this.voyages = voyas;
      });
  }
  rechercherVoyas(){
    this.voyageService.rechercherParNom(this.nomVoyage).
    subscribe(Voyas => {
    this.voyages = Voyas;
    console.log(Voyas)});
    }
    onKeyUp(filterText: string) {
      this.voyages = this.allVoyages.filter(item =>
        item.nomVoyage!.toLowerCase().includes(filterText)
      );
    }
    
    
}
