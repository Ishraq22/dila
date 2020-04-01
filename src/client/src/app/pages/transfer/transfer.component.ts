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
  selector: "transfer-cmp",
  moduleId: module.id,
  templateUrl: "transfer.component.html",
  styleUrls: ["transfer.component.scss"]
})
export class TransferComponent implements OnInit {
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

    this.listProperties();
  }

  property: Property[] = [];
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
        proper.id = i;
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


  closeResult = '';
  open(content, item) {
    // console.log(item.id);
    this.toAccount();
    this.fromAccount(item.id);
    this.propertyID = item.id;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    console.log(reason);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
    // console.log(this.selectedAccount);

  }

  from_account: any = null;
  async fromAccount(id) {
    // console.log(id);

    this.from_account = await this.myContract.methods.tokenIndexToOwner(id).call();
    // console.log(this.from_account);
  }

  to_account = [];
  propertyID = null;
  selectedAccount = null;

  async toAccount() {
    this.web3.setProvider('ws://localhost:7545');
    var accounts = await this.web3.eth.getAccounts();
    this.to_account.push(accounts);
    // console.log(this.to_account)
    this.loading = false;
  }

  transfer() {
    // console.log(this.selectedAccount);
    // console.log(this.from_account, this.selectedAccount, this.propertyID);

    var account = '0x92eD3DEbd569f8bA19868cf2e523c91e344D7492';
    this.myContract.methods.transferFrom(this.from_account, this.selectedAccount, this.propertyID).send({ from: account });
  }


}
