import { Component, OnInit, Injectable, Inject } from "@angular/core";
import Chart from "chart.js";
import { FormBuilder, FormGroup } from "@angular/forms";
// import { AccountsService } from '../../ethereum/eth.service'
import { WEB3 } from '../../tokens/web3.token';
import Web3 from 'web3';
import * as DILA from '../../../../../abis/DILA.json';
// import * as DILA from '../../../../../../../Contract/nft-master/src/abis/Color.json';

// import { NgxSpinnerService } from "ngx-spinner";
import { Property } from './model';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


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
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  closeResult = '';


  propertyForm: FormGroup;
  show = false;
  nav = "";

  property: Property[] = [];

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

  constructor(private fb: FormBuilder, @Inject(WEB3) private web3: Web3, private modalService: NgbModal) {
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
    this.editProfileForm = this.fb.group({
      property_address: [''],
      apt_no: [''],
      city: [''],
      postal_code: [''],
      province: [''],
      mls_number: ['']
    });

    // this.web3 = new Web3(this.provider);
    // this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
    // this.web3.setProvider('ws://localhost:7545');
    // const account = this.web3.eth.getAccounts().then(data => console.log(data));
    // console.log(account);

    const networkID = 5777
    const networkData = DILA.networks[networkID];
    var abi = DILA.abi;
    var abiNew = JSON.stringify(abi);
    const address = networkData.address;
    this.myContract = new this.web3.eth.Contract(JSON.parse(abiNew), address);
    // console.log(this.myContract);
    var num = 0;



    // totalSupply.then(function (result) {
    //   for (let i = 0; i < result; i++) {
    //     num += 1;
    //     proper[i] = this.myContract.methods.tokens(i).call().then(data => console.log(data));
    //   }

    // console.log(num);
    // });
    // for (let i = 0; i < 2; i++) {
    //   var proper = this.myContract.methods.tokens(num).call();
    //   console.log("ss" + proper);
    // }

    // console.log(num);
    // for (let i = 0; i < num; i++) {
    //   var proper = this.myContract.methods.tokens(0).call().then(data => console.log(data));
    // }


    // var proper = this.myContract.methods.tokens(0).call().then(data => console.log(data));
    // console.log("ss" + proper);



  }

  ngOnInit() {


  }

  editProfileForm: FormGroup;

  open(content, proper) {
    // console.log(proper.property_address);
    this.editProfileForm.patchValue({
      property_address: proper.property_address,
      apt_no: proper.apt_no,
      city: proper.city,
      postal_code: proper.postal_code,
      province: proper.province,
      mls_number: proper.mls_number
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async getProperties() {
    this.property = [];
    var totalSupply = await this.myContract.methods.totalSupply().call();
    // console.log(totalSupply);

    // var items = await this.myContract.methods.tokenIndexToOwner(1).call();
    // console.log(items);


    for (let i = 0; i < totalSupply; i++) {
      this.myContract.methods.tokens(i).call().then(data => {
        // console.log(data);
        let proper = {} as Property;
        proper.property_address = data.property_address;
        proper.apt_no = data.apt_no;
        proper.city = data.city;
        proper.postal_code = data.postal_code;
        proper.province = data.province
        proper.mls_number = data.mls_number;
        if (proper.property_address) {
          this.property.push(proper)
        }

      });
    }
    // this.loading = false;
    // await console.log(this.property);
    this.loading = false;
  }

  listProperties() {
    this.loading = true;
    this.getProperties();
  }

  addProperty(data: any) {
    this.loading = true;
    var account = '0x92eD3DEbd569f8bA19868cf2e523c91e344D7492';

    this.myContract.methods.mint(data.address, data.apt_no, data.city, data.postal_code, data.province, data.mls_number).send({ from: account });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.loading = false;
    }, 5000);
    // this.loading = false;
    // console.log(data);
  }

  changeNav(_nav) {
    if (_nav == "list") {
      this.listProperties();
    }
    this.show = true;
    this.nav = _nav;
    // console.log(_nav);
  }
}
