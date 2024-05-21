import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../services/voyage.service';
import { Classe } from '../model/Classe.model';

@Component({
  selector: 'app-update-voyage',
  templateUrl: './update-voyage.component.html',
  styles: [
  ]
})
export class UpdateVoyageComponent implements OnInit {

  currentVoyage = new Voyage();
  classes! : Classe[];
  updatedClId! : number;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private voyageService: VoyageService) {
  }

  ngOnInit(): void {
    this.voyageService.listeClasses().subscribe(response => {
      if (response) {
        this.classes = response;
        console.log(this.classes); // Check if classes are retrieved correctly
      }
    });
  
    // Fetch the current voyage using ActivatedRoute
    this.voyageService.consulterVoyage(this.activatedRoute.snapshot.params['id'])
      .subscribe(voya => {
        this.currentVoyage = voya;
        this.updatedClId = this.currentVoyage.classe?.idCl || 0; // Use optional chaining for safety
      });
  }

  updateVoyage() {
    if (this.classes) {
      const selectedClasse = this.classes.find(cl => cl.idCl == this.updatedClId);
      if (selectedClasse) {
        this.currentVoyage.classe = selectedClasse;
        this.voyageService.updateVoyage(this.currentVoyage).subscribe(voya => {
          this.router.navigate(['Voyages']);
        });
      } else {
        console.error('Selected classe not found.');
      }
    } else {
      console.error('Classes array is undefined.');
    }
  }
  
}