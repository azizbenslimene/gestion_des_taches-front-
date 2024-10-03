import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User(); // Initialize user object

  constructor(private router: Router, private service: ServiceService) {}

  register() {
    this.user.role = 'user'; // Ensure the role is 'user' for verification

    // Call register service
    this.service.register(this.user).subscribe(res => {
      console.table(res);
      this.router.navigate(['/login']); // Navigate to login page after successful registration
    });
  }
}
