// In apartment-tenant.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApartmentTenantService {
  constructor(private http: HttpClient) { }

  getApartments() {
    return this.http.get('/easyrent-api/v1/tenant/apartments');
  }
}
