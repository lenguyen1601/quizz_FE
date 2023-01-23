import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('dien ten di thang ngu');
      this.snack.open('Username is required', '', {
        duration: 3000,
      });
      return;
    }

    //validate

    // addUser: userService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        // alert('success');
        Swal.fire('Success done!!', 'User id is', 'success');
      },
      (error) => {
        //error
        console.log(error);
        // alert('somthing wrong');
        this.snack.open('something wrong', '', {
          duration: 3000,
        });
      }
    );
  }
}
