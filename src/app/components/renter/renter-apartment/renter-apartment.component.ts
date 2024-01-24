// In renter-apartment.component.ts
import { Component, OnInit } from '@angular/core';
import { ApartmentTenantService } from '../../../services/apartment-tenant.service';

@Component({
  selector: 'app-renter-apartment',
  templateUrl: './renter-apartment.component.html',
  styleUrls: ['./renter-apartment.component.css']
})
export class RenterApartmentComponent implements OnInit {
  apartments: any[] = [];

  constructor(private apartmentTenantService: ApartmentTenantService) {}

  ngOnInit(): void {
    this.apartmentTenantService.getApartments().subscribe((data: any) => {
      this.apartments = data;
    });
  }
}
