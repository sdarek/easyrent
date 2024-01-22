// owner-apartment-management.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentService } from 'src/app/services/apartment.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-owner-apartment-management',
  templateUrl: './owner-apartment-management.component.html',
  styleUrls: ['./owner-apartment-management.component.css']
})
export class OwnerApartmentManagementComponent implements OnInit {
  apartmentId!: number;
  apartmentDetails: any = {};
  rentContractDetails: any = {};
  tenantDetails: any = {};
  newTenantDetails: any = {}; // Nowy lokator
  newRentContractDetails: any = {}; // Nowa umowa
  rentContracts: any[] = [];
  tenants: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService: ApartmentService,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apartmentId = params['id'];
      this.getApartmentDetails();
      this.getRentContracts();
      this.getTenants();
      
      // Dodaj wywołanie dla listy umów najmu, jeśli potrzebne
    });
  }

  deleteApartment(): void {
    this.apartmentService.deleteApartment(this.apartmentId).subscribe(
      (response: any) => {
        this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Mieszkanie usunięto pomyślnie' });
        this.router.navigate(['/owner/owner-apartments']);
      },
      (error) => {
        this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas usuwania mieszkania' });
      }
    );
  }
  
  getApartmentDetails(): void {
    this.apartmentService.getApartmentDetails(this.apartmentId).subscribe(
      (apartmentDetails: any) => {
        this.apartmentDetails = apartmentDetails;
      },
      (error) => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Wystąpił błąd podczas pobierania szczegółów mieszkania' });
      }
    );
  }

  updateApartment(): void {
    this.apartmentService.updateApartment(this.apartmentId, this.apartmentDetails).subscribe(
      (response: any) => {
        this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Mieszkanie zaktualizowano pomyślnie' });
        // this.router.navigate(['/owner/owner-apartments']);
      },
      (error) => {
        this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas aktualizacji mieszkania' });
      }
    );
  }


  getRentContractDetails(): void {
    this.apartmentService.getRentContractDetails(this.apartmentId, this.rentContractDetails.id).subscribe(
      (rentContractDetails: any) => {
        this.rentContractDetails = rentContractDetails;
      },
      (error) => {
        console.error('Error while fetching rent contract details:', error);
      }
    );
  }

  updateRentContract(): void {
    // Implementuj logikę aktualizacji umowy najmu
    // Użyj this.apartmentService.updateRentContract(apartmentId, contractId, updatedContract).subscribe(...)
  }

  deleteRentContract(): void {
    // Implementuj logikę usuwania umowy najmu
    // Użyj this.apartmentService.deleteRentContract(apartmentId, contractId).subscribe(...)
  }

  getTenantDetails(): void {
    this.apartmentService.getTenantDetails(this.apartmentId, this.rentContractDetails.id, this.tenantDetails.id).subscribe(
      (tenantDetails: any) => {
        this.tenantDetails = tenantDetails;
      },
      (error) => {
        this.tenantDetails = null;
        console.error('Error while fetching tenant details:', error);
      }
    );
  }

  updateTenantDetails(): void {
    // Implementuj logikę aktualizacji informacji o lokatorze
    // Użyj this.apartmentService.updateTenantDetails(apartmentId, contractId, tenantId, updatedTenant).subscribe(...)
  }

  deleteTenantDetails(): void {
    // Implementuj logikę usuwania informacji o lokatorze
    // Użyj this.apartmentService.deleteTenantDetails(apartmentId, contractId, tenantId).subscribe(...)
  }

  getRentContracts(): void {
    this.apartmentService.getRentContracts(this.apartmentId).subscribe(
      (rentContracts: any) => {
        this.rentContracts = rentContracts;
      },
      (error) => {
        console.error('Błąd podczas pobierania listy umów najmu:', error);
      }
    );
  }

  addRentContract(): void {
    this.apartmentService.addRentContract(this.apartmentId, this.newRentContractDetails).subscribe(
      (response: any) => {
        this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Umowa najmu dodana pomyślnie' });
        this.getRentContractDetails(); // Ponowne pobranie danych umowy najmu po dodaniu
      },
      (error) => {
        this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas dodawania umowy najmu' });
      }
    );
  }



  getTenants(): void {
    this.apartmentService.getTenants(this.apartmentId, this.rentContractDetails.id).subscribe(
      (tenantsList: any) => {
        this.tenants = tenantsList;
      },
      (error) => {
        console.error('Błąd podczas pobierania listy umów najmu:', error);
      }
    );
  }


  addTenant(): void {
    this.apartmentService.addTenant(this.apartmentId, this.rentContractDetails.id, this.newTenantDetails).subscribe(
      (response: any) => {
        this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Lokator dodany pomyślnie' });
        this.getTenantDetails(); // Reload tenant details after adding
      },
      (error) => {
        this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas dodawania lokatora' });
      }
    );
  }

  showRentContractDetails(rentContract: any): void {
    this.rentContractDetails = rentContract;
    // Resetujemy dane nowej umowy
    this.newRentContractDetails = {};
    // Pobieramy szczegóły lokatora dla umowy (jeśli istnieją)
    this.getTenantDetails();
  }
}
