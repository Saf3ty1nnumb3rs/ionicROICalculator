import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, Content } from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { StatusBar } from "@ionic-native/status-bar";
import { Platform } from "ionic-angular";



@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  private screenOrientation: ScreenOrientation;
  @ViewChild(Content) content: Content;

  hydraCI: number;
  hydraMach: number;
  totalCI: number;
  discountPercent: boolean;
  discount: number;
  taxDisc: number;
  netCapInv: number;
  projectedHTD: number;
  daysOfOp: number;
  totalWeeklyTreat: number;
  pricePerTreatment: number;
  percentOfTreatMentBooster: number;
  addBooster: number;
  addRevenue: number;
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
  liftPercent: number;
  selectedValue: string;
  weekAll: string;
  weekLift: string;
  averageGPT: string;
  totCap: string;
  netRPT: string;
  netCap: string;
  monthGross: string;
  monthConsume: string;
  monthNet: string;
  oneYG: string;
  oneYP: string;
  fiveYG: string;
  fiveYP: string;

  constructor(
    public navCtrl: NavController,
    private keyboard: Keyboard,
    screenOrientation: ScreenOrientation,
    statusBar: StatusBar,
    platform: Platform
  ) {
    this.screenOrientation = screenOrientation;
    platform.ready().then(async () => {
      statusBar.hide();
    });
  }

  ngOnInit() {
    this.hydraCI = 25000;
    this.discount = 0;
    this.hydraMach = 2;
    this.projectedHTD = 3;
    this.daysOfOp = 6;
    this.pricePerTreatment = 150;
    this.percentBoost = 20;
    this.addBooster = 75;
    this.consumableCost = 25;
    this.boosterCost = 20;
    this.liftPercent = 1.25;
    this.selectedValue = "medium";
    this.discountPercent = false;
    this.calculateInvestment();
    this.lockLandscape();
  }
  lockLandscape = () => {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  };

  //Scroll functions
  scrollBottomTimeout = () => {
    //scrollToBottom takes
    this.content.scrollToBottom(250);
    console.log("Fire!!!!!");
  };

  bottomScroll = () => {
    let TIME_IN_MS = 290;
    let scrollTimeout = setTimeout(() => {
      this.scrollBottomTimeout();
    }, TIME_IN_MS);
    scrollTimeout;
  };
  //Calculations
  calculateInvestment() {
    if(this.discountPercent === true){
      this.discount = 0.35
    }else{
      this.discount = 0
    }
    this.totalCI = this.hydraCI * this.hydraMach;
    console.log(this.discountPercent)
    this.taxDisc = this.roundNumber(this.totalCI * this.discount)
    console.log('Tax Discount', this.taxDisc + ' and ' + this.discount)
    this.netCapInv = this.totalCI - this.taxDisc;
    this.totCap = this.numberWithCommas(this.totalCI);
    this.netCap = this.numberWithCommas(this.netCapInv);
    this.treatmentVolume();
  }
  treatmentVolume() {
    this.totalWeeklyTreat = this.roundNumber(this.projectedHTD * this.daysOfOp);
    this.treatmentRevenue();
  }
  treatmentRevenue() {
    this.percentOfTreatMentBooster = this.percentBoost / 100;
    console.log('% of treatment' ,this.percentOfTreatMentBooster)
    this.addRevenue = this.roundNumber(this.totalWeeklyTreat * this.percentOfTreatMentBooster * this.addBooster);
    this.weeklyRevAll =
      this.totalWeeklyTreat * this.pricePerTreatment + this.addRevenue;
    this.weekAll = this.numberWithCommas(this.weeklyRevAll.toFixed(2));
    this.weeklyRevWithLift =
      Math.round(this.weeklyRevAll * this.liftPercent * 100) / 100;
    this.weekLift = this.numberWithCommas(this.weeklyRevWithLift.toFixed(2));
    this.averageGrossPerTreat =
      Math.round((this.weeklyRevWithLift / this.totalWeeklyTreat) * 100) / 100;
    this.averageGPT = this.averageGrossPerTreat.toFixed(2);
    this.investmentReturn();
  }
  investmentReturn() {
    this.monthlyGrossRev =
      Math.round(this.weeklyRevWithLift * 4.25 * 100) / 100;
    this.monthlyConsumableCost =
      Math.round(
        (this.totalWeeklyTreat * this.consumableCost +
          this.boosterCost * this.totalWeeklyTreat) *
          4.25 *
          100
      ) / 100;
    this.monthlyNetRev =
      Math.round((this.monthlyGrossRev - this.monthlyConsumableCost) * 100) /
      100;
    this.netRevPerTreatment =
      Math.round((this.monthlyNetRev / (this.totalWeeklyTreat * 4.25)) * 100) /
      100;
    this.netRPT = this.netRevPerTreatment.toFixed(2);
    this.monthGross = this.numberWithCommas(this.monthlyGrossRev.toFixed(2));
    this.monthConsume = this.numberWithCommas(
      this.monthlyConsumableCost.toFixed(2)
    );
    this.monthNet = this.numberWithCommas(this.monthlyNetRev.toFixed(2));
    this.payoffBleu();
  }
  payoffBleu() {
    this.monthPayoff = this.roundNumber(this.netCapInv / this.monthlyNetRev);
    this.treatPayoff = this.roundNumber(
      this.netCapInv / this.netRevPerTreatment
    );
    this.oneYearGross = Math.round(this.monthlyGrossRev * 12);
    this.oneYearProf = Math.round(this.monthlyNetRev * 12 - this.netCapInv);
    this.fiveYearGross = Math.round(this.monthlyGrossRev * 60);
    this.fiveYearProf = Math.round(this.monthlyNetRev * 60 - this.netCapInv);

    this.oneYG = this.numberWithCommas(this.oneYearGross);
    this.oneYP = this.numberWithCommas(this.oneYearProf);
    this.fiveYG = this.numberWithCommas(this.fiveYearGross);
    this.fiveYP = this.numberWithCommas(this.fiveYearProf);
    this.hideKeyboard();
  }

  //Helper Functions
  hideKeyboard = () => {
    this.keyboard.close();
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  roundNumber = num => {
    return Math.round(num * 100) / 100;
  };
  liftPercentValue() {
    console.log(this.selectedValue);
    const val = this.selectedValue;
    if (val === "medium") {
      this.liftPercent = 1.25;
    } else if (val === "high") {
      this.liftPercent = 1.35;
    } else if (val === "low") {
      this.liftPercent = 1.15;
    } else {
      this.liftPercent = 1.0;
    }
    this.calculateInvestment();
  }

  calculateDiscount(x) {
    const z = document.querySelectorAll('.checkbox')[x]
    console.log(z)
    this.discountPercent = !this.discountPercent;
    this.calculateInvestment();
  }

  moveCursorToEnd = (e) => {
    event.preventDefault()
    console.log('hello')
    const x = document.querySelectorAll("input")[e]
    console.log(x)
    if(!x.value.length){
      let leng = x.maxLength
      console.log(x.maxLength)
      x.setSelectionRange(leng, leng)
    }else if(x.value){
    const leng = x.value.length
    x.setSelectionRange(leng, leng)
    }else{
      const leng = 5
      x.setSelectionRange(leng, leng)
    }
  }
}
