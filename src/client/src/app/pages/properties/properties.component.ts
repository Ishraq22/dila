import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { FormBuilder, FormGroup } from "@angular/forms";

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

  constructor(private fb: FormBuilder) {
    this.propertyForm = fb.group({
      address: [null],
      apt_no: [null],
      city: [null],
      postal_code: [null],
      province: [null],
      country: [null]
    });
  }

  ngOnInit() {}

  addProperty() {}

  listProperty() {}

  changeNav(_nav) {
    this.show = true;
    this.nav = _nav;
    console.log(_nav);
  }
}
