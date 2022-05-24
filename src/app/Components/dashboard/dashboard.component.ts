import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  search: any;
  cancel: boolean = false;
  fullName: any='';

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.fullName = localStorage.getItem('name');
  }

  searchNote(event: any) {
    this.cancel = true;
    if (this.search == ('' || undefined)) {
      this.cancel = false;

    }
  }

  searchClear() {
    this.search = '';
    this.cancel = false;
  }

  login(){
    this.router.navigateByUrl('/login');
  }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    //localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
