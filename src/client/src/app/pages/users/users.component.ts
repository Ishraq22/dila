import { Component, OnInit, Injectable, Inject } from "@angular/core";
import Chart from "chart.js";
import { FormBuilder, FormGroup } from "@angular/forms";
// import { AccountsService } from '../../ethereum/eth.service'
import { WEB3 } from '../../tokens/web3.token';
import Web3 from 'web3';
import * as DILA from '../../../../../abis/DILA.json'
// import { NgxSpinnerService } from "ngx-spinner";
import { Property } from './model';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: "users-cmp",
  moduleId: module.id,
  templateUrl: "users.component.html",
  styleUrls: ["users.component.scss"]
})
export class UsersComponent implements OnInit {
  public myContract;
  success = false;
  error = false;
  loading = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  allAccounts = [];


  constructor(@Inject(WEB3) private web3: Web3, private modalService: NgbModal) {

    const networkID = 5777
    const networkData = DILA.networks[networkID];
    var abi = DILA.abi;
    var abiNew = JSON.stringify(abi);
    const address = networkData.address;
    this.myContract = new this.web3.eth.Contract(JSON.parse(abiNew), address);

  }

  ngOnInit() {
    this.loading = true;
    this.getAccounts();
  }

  async getAccounts() {
    this.web3.setProvider('ws://localhost:7545');
    var accounts = await this.web3.eth.getAccounts();
    this.allAccounts.push(accounts);
    this.loading = false;
    // console.log(this.allAccounts);
  }

  property: Property[] = [];
  async getTokens(account) {
    this.property = [];
    var totalSupply = await this.myContract.methods.totalSupply().call();
    for (let i = 0; i < totalSupply; i++) {
      this.myContract.methods.tokenIndexToOwner(i).call().then(data => {
        if (data == account) {
          this.myContract.methods.tokens(i).call().then(data => {
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
            // console.log(proper);
          });
        }
      });
    }
  }


  closeResult = '';
  open(content, account) {
    this.getTokens(account);
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



}
