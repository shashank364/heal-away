import { Component, OnInit } from '@angular/core';
import { User } from '../module';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'gender', 'country', 'enquiredAt','status'];
  users: User[] = [];
  ;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    // Fetch user data using your FirebaseService
    this.firebaseService.getUserData().subscribe(users => {
      this.users = users;
    });
  }
  updateStatus(user: User) {
    this.firebaseService.updateUserStatus(user.id, user.status);
  }
  deleteUser(user: User) {
    this.firebaseService.deleteUserStatus(user.id);
  }
}
