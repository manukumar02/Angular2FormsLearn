import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup
    customer: Customer= new Customer();

    ngOnInit(): void {
        this.customerForm = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl(),
            sendCatalog: new FormControl(true)
        })
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
    populateTestData(): void {
        // this.customerForm.setValue({
        //     firstName: 'Manu',
        //     lastName: 'Sharma',
        //     email: 'manukumar02@gmail.com',
        //     sendCatalog: false
        // })
        this.customerForm.patchValue({
            firstName: 'Manu',
            lastName: 'Sharma',
            // email: 'manukumar02@gmail.com',
            sendCatalog: false
        })
    }
 }
