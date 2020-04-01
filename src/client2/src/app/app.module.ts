import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { CommonModule } from "@angular/common";
import { WEB3 } from "./tokens/web3.token";
const Web3 = require("web3");
import { AccountsService } from "./ethereum/eth.service";

import { EthereumModule } from './ethereum/ethereum.module';
import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";
// import { NgxSpinnerModule } from "ngx-spinner";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    // NgxSpinnerModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // AccountsService,
    // {
    //   provide: WEB3,
    //   useFactory: (provider: any) =>
    //     new Web3("ws://localhost:7545")
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
