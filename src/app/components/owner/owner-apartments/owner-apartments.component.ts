import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-apartments',
  templateUrl: './owner-apartments.component.html',
  styleUrls: ['./owner-apartments.component.css']
})
export class OwnerApartmentsComponent {

  constructor(private router: Router) { }

  //ngOnInit(): void {
  //  // Pobierz listę mieszkań z serwisu przy inicjalizacji komponentu
  //  this.apartments = this.apartmentService.getApartments();
  //}

  onApartmentClick(apartmentId: number): void {
    this.router.navigate(['/owner/owner-apartment-management', apartmentId]);
  }

  apartments: any[] = [
    // Tutaj możesz umieścić przykładowe dane mieszkań
    { id: 1, name: 'Apartament 1', address: 'ul. Przykładowa 1', rooms: 3, available: true },
    { id: 2, name: 'Apartament 2', address: 'ul. Przykładowa 2', rooms: 2, available: false },
    // Dodaj inne mieszkania
  ];
}
