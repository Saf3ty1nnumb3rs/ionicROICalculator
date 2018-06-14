import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  hydraCI: number;
  hydraMach: number;
  totalCI: number;
  taxDisc: number;
  netCapInv: number;
  cliPerDiem: number;
  constructor(public navCtrl: NavController) {
    
  }

  ngOnInit() {
    this.hydraCI = 25000;
    this.hydraMach = 2;
    this.capitalInvestment();
  }


  capitalInvestment() {
    this.totalCI = this.hydraCI * this.hydraMach;
  }

}
