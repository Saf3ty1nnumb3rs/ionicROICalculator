import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  hydraCI: number;
  hydraMach: number;
  constructor(public navCtrl: NavController) {
    this.hydraCI = 25000;
    this.hydraMach = 2;
  }
}
