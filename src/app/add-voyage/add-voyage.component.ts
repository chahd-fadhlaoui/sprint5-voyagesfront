import { Component, OnInit } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { VoyageService } from '../services/voyage.service';
import { Router } from '@angular/router';
import { Classe } from '../model/Classe.model';

@Component({
  selector: 'app-add-voyage',
  templateUrl: './add-voyage.component.html'
})
export class AddVoyageComponent implements OnInit {

  newVoyage: Voyage = new Voyage(); // Déclarer 'newVoyage' de type 'Voyage'
  classes!: Classe[];
  newIdCl!: number;
  newClasse!: Classe;

  message: string;
  constructor(private voyageService: VoyageService, private router: Router) {
    this.message = '';
  }

  ngOnInit(): void {
    // this.classes=this.voyageService.listeClasses()
    this.voyageService.listeClasses().
          subscribe(clas => {this.classes = clas;
            console.log(clas);
        });
 
  }

  addVoyage() {
    this.newVoyage.classe = this.classes.find(cl => cl.idCl == this.newIdCl)!;
    this.voyageService.ajouterVoyage(this.newVoyage).subscribe(voya => {
        console.log(voya);
        this.router.navigate(['Voyages']);
      });


  }

}