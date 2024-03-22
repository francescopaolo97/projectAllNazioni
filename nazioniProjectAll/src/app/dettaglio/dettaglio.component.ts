import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NazioniService } from "../services/nazioni.service";
import * as L from "leaflet";

@Component({
  selector: "app-dettaglio",
  templateUrl: "./dettaglio.component.html",
  styleUrls: ["./dettaglio.component.scss"],
})
export class DettaglioComponent {
  nomeNazione: string = "";
  nazioneSingola: any;
  mymap: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private nazioniService: NazioniService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        this.nomeNazione = res.params.name;
        this.nazioniService.getNazione(this.nomeNazione).subscribe({
          next: (res: any) => {
            this.nazioneSingola = res;
            console.log(this.nazioneSingola);
            this.initializeMap();
          },
        });
      },
    });
  }

  initializeMap() {
    this.mymap = L.map("mapid").setView(
      [this.nazioneSingola[0].latlng[0], this.nazioneSingola[0].latlng[1]],
      5
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.mymap);

    this.mymap.on("click", this.onMapClick);
  }

  onMapClick(e: any) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(this.mymap);
  }
}
