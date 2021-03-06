import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Customer } from './customer';

function ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return {'range': true}
        }
        return null;
    }
}

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup;
    customer: Customer= new Customer();

    constructor(private fb: FormBuilder) {

    }
    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: ['Manu', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            phone: '',
            rating: ['', ratingRange(3, 7)],
            notification: 'email',
            sendCatalog: true
            // firstName: 'Manu',
            // lastName: {value: 'n/a', disabled: true},
            // email: '',
            // sendCatalog: true
        });
        // this.customerForm = new FormGroup({
        //     firstName: new FormControl(),
        //     lastName: new FormControl(),
        //     email: new FormControl(),
        //     sendCatalog: new FormControl(true)
        // })
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    setNotification(notifyVia: string): void {
        const phoneControl = this.customerForm.get('phone');
        if(notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
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
