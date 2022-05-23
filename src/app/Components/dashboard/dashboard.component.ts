import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  search : any;
  c: boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }

  searchNote(event:any){
  this.c = true;
  if(this.search==''){
    this.c = false;
    
  }

  }

  searchClear(){
    this.search = '';
    this.c = false;
  }
}
