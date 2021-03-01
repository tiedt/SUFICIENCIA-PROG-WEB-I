import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor( public router: Router
    , private toastr: ToastrService) {}
  

  ngOnInit() {
  }
  showMenu() {
    return this.router.url !== '/user/login';
  }
}
