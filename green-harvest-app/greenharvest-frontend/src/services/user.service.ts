import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';

class UserService {
  getUserDetails() {
      throw new Error('Method not implemented.');
  }
  // Create a BehaviorSubject to store user details
  private userDetailsSubject = new BehaviorSubject<User | null>(null);

  // Observable stream for user details
  userDetails$ = this.userDetailsSubject.asObservable();

  // Method to update user details
  setUserDetails(user: User) {
    this.userDetailsSubject.next(user);
  }

  // Method to clear user details (e.g., on logout)
  clearUserDetails() {
    this.userDetailsSubject.next(null);
  }

  // Method to get the current user details (synchronously)
  getCurrentUserDetails(): User | null {
    return this.userDetailsSubject.getValue();
  }
}

// Export an instance of the service
export const userService = new UserService();