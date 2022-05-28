import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/DataService/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  search: any;
  cancel: boolean = false;
  fullName: any='';

  constructor(private router:Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.fullName = localStorage.getItem('name');
  }

  searchNote(event: any) {
    //console.log(event.target.value)
    this.cancel = true;
    
    this.search=event.target.value
    this.dataService.sendData(event.target.value)

    if (this.search == '') {
      this.cancel = false;
    }
  }

  searchClear() {
    this.search = '';
    this.cancel = false;
    this.dataService.sendData(this.search)
  }

  login(){
    this.router.navigateByUrl('/login');
  }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('mobile');
    //localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
