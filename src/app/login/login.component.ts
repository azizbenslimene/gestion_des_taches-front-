import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/service/service.service';
import { SessionManagmentService } from 'src/app/service/session-managment.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  user: User = new User(); // User model binding for email and password
  displayVerificationDialog: boolean = false; // Control visibility of verification dialog
  verificationCode: string = ''; // Variable to store the verification code input
  backendIp: string = ''; // Store backend IP

  constructor(
    private service: ServiceService,
    private router: Router,
    private session: SessionManagmentService,
    private messageService: MessageService
  ) {}

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  // Login function to validate credentials and handle IP verification
  login() {
    console.log('Attempting login with:', this.user);
  
    // Call the login service with user credentials
    this.service.login(this.user).subscribe({
      next: (res) => {
        // Store token in session after successful login
        this.session.savetoken(res.token);
        const userData = this.session.getdata(); // Get user data from session
        console.log('User data from session:', userData);
  
        // If the account is not verified, show the verification dialog
        if (userData.verifyUser === 0) {
          this.openVerificationDialog(); // Show verification dialog for unverified users
          this.showError('Account not verified. Please enter your verification code.');
          return; // Do not proceed to IP check if the account is unverified
        }
  
        // If the account is verified, proceed based on the user's role
        this.redirectUserBasedOnRole(userData.role);
      },
      error: (err) => {
        console.error('Error during login:', err);
        if (err.status === 403) {
          // Check if this error is due to new IP detection or unverified account
          if (err.error.message.includes("New IP detected")) {
            // Show a notification that a verification email for the new IP was sent
            this.showError('A new IP address was detected. Please check your email to verify the IP.');
          } else {
            this.openVerificationDialog(); // Open the verification dialog for unverified accounts
            this.showError(err.error.message || 'Account not verified. Please enter your verification code.');
          }
        } else {
          this.showError('Invalid credentials. Please try again.');
        }
      }
    });
  }
  


  // Open the verification dialog
  openVerificationDialog() {
    console.log('Opening verification dialog...');
    this.displayVerificationDialog = true;
  }

  // Close the verification dialog
  closeVerificationDialog() {
    console.log('Closing verification dialog...');
    this.displayVerificationDialog = false;
  }

  // Submit verification code to backend
  submitVerificationCode() {
    console.log('Submitting verification code:', this.verificationCode);

    if (this.verificationCode.trim() === '') {
      this.showError('Verification code cannot be empty.');
      return;
    }

    // Call service to verify the user's code
    this.service.verifyUserCode(this.user.emailUser, this.verificationCode).subscribe({
      next: (res) => {
        console.log('Verification successful:', res);
        this.showSuccess('Verification successful. You can now log in.');
        this.updateUserVerificationStatus(); // Update the user's status to verified
      },
      error: (err) => {
        console.error('Verification failed:', err);
        this.showError('Incorrect verification code. Please try again.');
      }
    });
  }

  // Update verification status of the user
  updateUserVerificationStatus() {
    console.log('Updating verification status for:', this.user.emailUser);

    this.service.updateVerificationStatus(this.user.emailUser).subscribe({
      next: () => {
        console.log('User verification status updated.');
        this.closeVerificationDialog(); // Close the dialog once verified
        this.login(); // Retry login after successful verification
      },
      error: (err) => {
        console.error('Failed to update verification status:', err);
        this.showError('Failed to update verification status.');
      }
    });
  }

  // Redirect user based on their role
  redirectUserBasedOnRole(role: string) {
    console.log('Redirecting user based on role:', role);
    if (role === 'admin') {
      this.router.navigate(['/admin/dashboardadmin']);
      this.showSuccess('Welcome Admin!');
    } else {
      this.router.navigate(['/user/dashboard']);
      this.showSuccess('Welcome User!');
    }
  }
}
