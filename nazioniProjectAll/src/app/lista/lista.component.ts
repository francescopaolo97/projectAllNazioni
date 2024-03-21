import { Component } from '@angular/core';
import { NazioniService } from '../services/nazioni.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent {
  listaNazioni!: any[];
  constructor(private nazioniService: NazioniService) {}

  ngOnInit() {
    this.nazioniService.getAllNazioni().subscribe({
      next: (res: any) => {
        this.listaNazioni = res;
      },
    });
  }

  passaNome(nome: string) {
    this.nazioniService.getNazione(nome).subscribe({
      next: (res: any) => {},
    });
  }
}
