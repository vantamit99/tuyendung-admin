import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styles: [
  ]
})
export class ProfilePage implements OnInit {
  profileUser: any = {}; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {    
    this.authService.getProfile().subscribe(res => {     
      this.profileUser = res;      
    })    
  }

}
