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
  clientsPerDiem: number;
  percentOfPat: number;
  projectedPPD: number;
  daysOfOp: number;
  totalWeeklyTreat: number;
  pricePerTreatment: number;
  percentOfTreatMentBooster: number;
  addBooster: number;
  weeklyRevAll: number;
  weeklyRevWithLift: number;
  averageGrossPerTreat: number;
  consumableCost: number;
  boosterCost: number;
  monthlyGrossRev: number;
  monthlyConsumableCost: number;
  monthlyNetRev: number;
  netRevPerTreatment: number;
  monthPayoff: number;
  treatPayoff: number;
  oneYearGross: number;
  oneYearProf: number;
  fiveYearGross: number;
  fiveYearProf: number;

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    this.hydraCI = 25000;
    this.hydraMach = 2;
    this.taxDisc = 0;
    this.clientsPerDiem = 10;
    this.percentOfPat = 0.5;
    this.daysOfOp = 6;
    this.pricePerTreatment = 150;
    this.percentOfTreatMentBooster = 0.2;
    this.addBooster = 75;
    this.consumableCost = 0;
    this.boosterCost = 0;
    this.calculateInvestment();
    this.treatmentVolume();
  }

  calculateInvestment() {
    this.totalCI = this.hydraCI * this.hydraMach;
    this.netCapInv = this.totalCI - this.taxDisc;
    this.payoffBleu();
  }
  treatmentVolume() {
    this.projectedPPD = this.clientsPerDiem * this.percentOfPat;
    this.totalWeeklyTreat = this.projectedPPD * this.daysOfOp;
    this.treatmentRevenue();
  }
  treatmentRevenue() {
    this.weeklyRevAll =
      (this.totalWeeklyTreat * this.pricePerTreatment) +
      ((this.totalWeeklyTreat * this.percentOfTreatMentBooster) *
        this.addBooster);
    this.weeklyRevWithLift = this.weeklyRevAll * 1.15;
    this.averageGrossPerTreat = this.weeklyRevWithLift / this.totalWeeklyTreat;
    this.investmentReturn();
  }
  investmentReturn() {
    this.monthlyGrossRev = this.weeklyRevWithLift * 4.25;
    this.monthlyConsumableCost =
      this.totalWeeklyTreat * (this.consumableCost + this.boosterCost);
    this.monthlyNetRev = this.monthlyGrossRev - this.monthlyConsumableCost;
    this.netRevPerTreatment =
      this.monthlyNetRev / (this.totalWeeklyTreat * 4.25);
    this.payoffBleu();
  }
  payoffBleu() {
    this.monthPayoff = this.netCapInv / this.monthlyNetRev;
    this.treatPayoff = this.netCapInv / this.netRevPerTreatment;
    this.oneYearGross = this.monthlyGrossRev * 12;
    this.oneYearProf = this.monthlyNetRev * 12 - this.netCapInv;
    this.fiveYearGross = this.monthlyGrossRev * 60;
    this.fiveYearProf = this.monthlyNetRev * 60 - this.netCapInv;
  }
}
