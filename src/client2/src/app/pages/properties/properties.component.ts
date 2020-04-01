import { Component, OnInit, Injectable, Inject } from "@angular/core";
import Chart from "chart.js";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AccountsService } from '../../ethereum/eth.service'
import { WEB3 } from '../../tokens/web3.token';
import Web3 from 'web3';
import * as DILA from '../../../../../abis/DILA.json'
// import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "properties-cmp",
  moduleId: module.id,
  templateUrl: "properties.component.html",
  styleUrls: ["properties.component.scss"]
})
export class PropertiesComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public myContract;
  public myAccount;
  success = false;
  error = false;
  loading = false;

  propertyForm: FormGroup;
  show = false;
  nav = "";

  Provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon Territory"
  ];

  constructor(private fb: FormBuilder, @Inject(WEB3) private web3: Web3) {
    this.propertyForm = fb.group({
      address: [null],
      apt_no: [null],
      city: [null],
      postal_code: [null],
      province: [null],
      country: ["Canada"],
      type: [null],
      size: [null],
      mls_number: [null]
    });

    // this.web3 = new Web3(this.provider);
    // this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    // const account = this.web3.eth.getAccounts();
    // console.log(account);

    const networkID = 5777
    const networkData = DILA.networks[networkID];
    var abi = DILA.abi;
    var abiNew = JSON.stringify(abi);
    const address = networkData.address;
    this.myContract = new this.web3.eth.Contract(JSON.parse(abiNew), address);
    // console.log(this.myContract);
    var num = 0;
    var totalSupply = this.myContract.methods.totalSupply().call();
    totalSupply.then(function (result) {
      for (let i = 0; i < result; i++) {
        num += 1;
      }
      console.log(num);
    });
    // for (let i = 0; i < 2; i++) {
    //   var proper = this.myContract.methods.tokens(num).call();
    //   console.log("ss" + proper);
    // }

    // var proper = this.myContract.methods.tokens(0).call().then(data => console.log(data));
    // console.log("ss" + proper);


  }

  ngOnInit() {
    // this.accountService.getAccounts().subscribe(
    //   data => {
    //     console.log(data);
    //   }
    // );
  }

  addProperty(data: any) {
    this.spinner.show();
    var account = '0x722d3619DD89ba65d1783634Deb21e4C226309c9';

    this.myContract.methods.mint(data.address, data.apt_no, data.city, data.postal_code, data.province, data.mls_number).send({ from: account }).subscribe(
      data => {
        console.log(data);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 2000);
      },
      error => {
        console.log("error" + error);
      }
    );
    // console.log(data);
  }



  listProperty() { }

  changeNav(_nav) {
    this.show = true;
    this.nav = _nav;
    // console.log(_nav);
  }
}
