import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SearchService } from 'src/app/shared/services/search.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private searchService: SearchService  
  ) { }

  ngOnInit(): void {
  }
  onLogout() {   
    this.authService.logout().subscribe(res => {
      this.router.navigateByUrl('/auth/login');
    });
  }

  onEmitValueSearch(e) {
    this.searchService.valueSearch$.next(e.target.value)
  }
}
