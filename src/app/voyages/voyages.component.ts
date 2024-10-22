import { Component, OnInit } from '@angular/core';
import { Voyage } from '../model/voyage.model'; 
import { VoyageService } from '../services/voyage.service'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-voyages', 
  templateUrl: './voyages.component.html' 
})
export class VoyagesComponent implements OnInit {

  voyages!: Voyage[]; 

  constructor(private voyageService: VoyageService,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.chargerVoyages();
  }

  chargerVoyages(): void {
    this.voyageService.listeVoyage().subscribe({
      next: (voya) => {
        console.log(voya);
        this.voyages = voya;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des voyages:", err);
      }
    });
  }

  supprimerVoyage(v: Voyage): void {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.voyageService.supprimerVoyage(v.idVoyage!).subscribe({
        next: () => {
          console.log("Voyage supprimé");
          this.chargerVoyages();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du voyage:", err);
        }
      });
    }
  }
}
