export class Property {
    id: any;
    property_address: any;
    apt_no: any;
    city: any;
    postal_code: any;
    province: any;
    mls_number: any;

    constructor(property_address, apt_no, city, postal_code, province, mls_number) {
        this.property_address = property_address;
        this.apt_no = apt_no;
        this.city = city;
        this.postal_code = postal_code;
        this.province = province;
        this.mls_number = mls_number;
    }
}