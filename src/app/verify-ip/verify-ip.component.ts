import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { MessageService } from 'primeng/api';
import { ServiceService } from 'src/app/service/service.service'; // Import the service for backend calls

@Component({
  selector: 'app-verify-ip',
  templateUrl: './verify-ip.component.html',
  styleUrls: ['./verify-ip.component.css'],
  providers: [MessageService]
})
export class VerifyIpComponent implements OnInit, AfterViewInit {
  userId: string = '';
  ip: string = '';
  locationData: any = {}; // To store geolocation data
  map: any; // For Leaflet map

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private service: ServiceService // Inject the service for backend calls
  ) {}

  ngOnInit(): void {
    // Get the parameters from the URL
    this.userId = this.route.snapshot.params['userId'];
    this.ip = this.route.snapshot.params['ip'];

    // Check if the IP is private or public
    if (this.isPrivateIP(this.ip)) {
      // If private, display a message and skip geolocation
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Private IP address detected. No geolocation available.' });
    } else {
      // Fetch geolocation for the provided IP
      this.getIpLocation(this.ip);
    }
  }

  // Lifecycle hook to initialize the map after the view has been initialized
  ngAfterViewInit(): void {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/images/marker1.png',
      iconUrl: 'assets/leaflet/images/marker-icon.png',
      shadowUrl: 'assets/leaflet/images/marker-shadow.png'
    });

    this.map = L.map('map').setView([0, 0], 2); // Default center at the equator (lat 0, lon 0)
  }

  // Fetch geolocation data using ip-api.com API
  getIpLocation(ip: string): void {
    const apiUrl = `http://ip-api.com/json/${ip}`;
    this.http.get(apiUrl).subscribe({
      next: (locationData) => {
        this.locationData = locationData;
        console.log('Location Data:', this.locationData);

        // If the API returned valid location data, update the map with the fetched lat/lng
        if (this.locationData.status === 'success') {
          this.updateMap(this.locationData.lat, this.locationData.lon); // lat and lon are returned by the API
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Unable to retrieve location for this IP.' });
        }
      },
      error: (error) => {
        console.error('Error fetching location data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching location data.' });
      }
    });
  }

  // Method to update the map with new coordinates
  updateMap(lat: number, lng: number): void {
    if (this.map) {
      this.map.setView([lat, lng], 13); // Set the view to the fetched latitude and longitude
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Add a marker at the IP location with a popup showing the city and country
      L.marker([lat, lng]).addTo(this.map)
        .bindPopup(`IP Address Location: Latitude: ${lat}, Longitude: ${lng}`)
        .openPopup();
    }
  }

  // Method to check if the IP is private
  isPrivateIP(ip: string): boolean {
    const privateIPRegex = /^(10\.\d{1,3}\.\d{1,3}\.\d{1,3})|^(172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})|^(192\.168\.\d{1,3}\.\d{1,3})|^(::1)$/;
    return privateIPRegex.test(ip);
  }

  // Accept IP and add it to the user's lastLoginIp
  acceptIp(): void {
    // Call the service to verify and update the user's IP address in the backend
    this.service.verifyIp(this.userId, this.ip).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'IP address verified and added.' });
        this.router.navigate(['/login']); // Navigate to the user dashboard after successful verification
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to verify IP address.' });
        console.error('Error during IP verification:', err);
      }
    });
  }

  // Reject IP and navigate back to login
  rejectIp(): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'You have chosen not to add this IP.' });
    this.router.navigate(['/login']); // Navigate to login on rejection
  }
}
