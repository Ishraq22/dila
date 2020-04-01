import { NgModule, ModuleWithProviders, Type } from "@angular/core";
import { CommonModule } from "@angular/common";
// Web3
import { WEB3 } from "../tokens/web3.token";
const Web3 = require("web3");

// Services
import { AccountsService } from "./eth.service";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    AccountsService,
    {
      provide: WEB3,
      useFactory: (provider: any) =>
        new Web3(Web3.givenProvider || "ws://localhost:7545")
    }
  ]
})
export class EthereumModule { }
