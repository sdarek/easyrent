import { Component } from '@angular/core';

@Component({
  selector: 'app-owner-apartment-management',
  templateUrl: './owner-apartment-management.component.html',
  styleUrls: ['./owner-apartment-management.component.css']
})

export class OwnerApartmentManagementComponent {
  apartmentName: string;
  apartmentAddress: string;
  note: string;

  constructor() {
    // Initialize properties, you can also fetch these from a service or server
    this.apartmentName = 'Sample Apartment Name';
    this.apartmentAddress = '1234 Main St, Anytown, AN';
    this.note = 'Some important note about the apartment';
  }
}