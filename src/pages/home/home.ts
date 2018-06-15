import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { Keyboard } from '@ionic-native/keyboard';

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
  percentPatient: number;
  percentBoost: number;
  weekAll: string;
  weekLift: string;
  totCap: string;
  netCap: string;
  monthGross: string;
  monthConsume: string;
  monthNet: string;
  oneYG: string;
  oneYP: string;
  fiveYG:string;
  fiveYP:string;

  constructor(public navCtrl: NavController, private keyboard: Keyboard) {}

  ngOnInit() {
    this.hydraCI = 25000;
    this.hydraMach = 2;
    this.taxDisc = 10000;
    this.clientsPerDiem = 10;
    this.percentPatient = 50;
    this.daysOfOp = 6;
    this.pricePerTreatment = 150;
    this.percentBoost = 20;
    this.addBooster = 75;
    this.consumableCost = 25;
    this.boosterCost = 20;
    this.calculateInvestment();
  }

  calculateInvestment() {

    this.totalCI = this.hydraCI * this.hydraMach;
    this.netCapInv = this.totalCI - this.taxDisc;
    this.totCap = this.numberWithCommas(this.totalCI);
    this.netCap = this.numberWithCommas(this.netCapInv);
    this.treatmentVolume();
  }
  treatmentVolume() {
    this.percentOfPat = this.percentPatient/100;
    this.projectedPPD = Math.round((this.clientsPerDiem * this.percentOfPat)*100)/100;
    this.totalWeeklyTreat = this.projectedPPD * this.daysOfOp;
    this.treatmentRevenue();
  }
  treatmentRevenue() {
    this.percentOfTreatMentBooster = this.percentBoost/100;
    this.weeklyRevAll =
      (this.totalWeeklyTreat * this.pricePerTreatment) +
      ((this.totalWeeklyTreat * this.percentOfTreatMentBooster) *
        this.addBooster);
    this.weekAll = this.numberWithCommas(this.weeklyRevAll);
    this.weeklyRevWithLift = Math.round((this.weeklyRevAll * 1.15)*100)/100;
    this.weekLift = this.numberWithCommas(this.weeklyRevWithLift);
    this.averageGrossPerTreat = Math.round((this.weeklyRevWithLift / this.totalWeeklyTreat)*100)/100;
    this.investmentReturn();
  }
  investmentReturn() {
    this.monthlyGrossRev = Math.round((this.weeklyRevWithLift * 4.25)*100)/100;
    this.monthlyConsumableCost =
      (this.totalWeeklyTreat * this.consumableCost) + (this.boosterCost*this.totalWeeklyTreat);
    this.monthlyNetRev = this.monthlyGrossRev - this.monthlyConsumableCost;
    this.netRevPerTreatment = Math.round(
      (this.monthlyNetRev / (this.totalWeeklyTreat * 4.25))*100)/100;
    this.monthGross = this.numberWithCommas(this.monthlyGrossRev);
    this.monthConsume = this.numberWithCommas(this.monthlyConsumableCost);
    this.monthNet = this.numberWithCommas(this.monthlyNetRev); 
    this.payoffBleu();
  }
  payoffBleu() {
    this.monthPayoff = this.roundNumber(this.netCapInv / this.monthlyNetRev);
    this.treatPayoff = this.roundNumber(this.netCapInv / this.netRevPerTreatment);
    this.oneYearGross = Math.round(this.monthlyGrossRev * 12);
    this.oneYearProf = Math.round(this.monthlyNetRev * 12 - this.netCapInv);
    this.fiveYearGross = Math.round(this.monthlyGrossRev * 60);
    this.fiveYearProf = Math.round(this.monthlyNetRev * 60 - this.netCapInv);
    
    this.oneYG = this.numberWithCommas(this.oneYearGross);
    this.oneYP = this.numberWithCommas(this.oneYearProf);
    this.fiveYG = this.numberWithCommas(this.fiveYearGross);
    this.fiveYP = this.numberWithCommas(this.fiveYearProf);
    this.keyboard.close();
  }

  //Helper Functions
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  roundNumber = (num) => {
    return Math.round(num*100)/100
  }
}
