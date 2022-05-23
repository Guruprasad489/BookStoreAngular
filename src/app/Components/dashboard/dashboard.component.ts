import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  search : any;
  cancel: boolean=false;
  fullName : any='Profile';
  
  constructor() { }

  ngOnInit(): void {
    this.fullName = localStorage.getItem('name');
  }

  searchNote(event:any){
  this.cancel = true;
  if(this.search==(''||undefined)){
    this.cancel = false;
    
  }

  }

  searchClear(){
    this.search = '';
    this.cancel = false;
  }
}
