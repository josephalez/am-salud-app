import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appoinments-list',
  templateUrl: './appoinments-list.page.html',
  styleUrls: ['./appoinments-list.page.scss']
})
export class AppoinmentsListPage implements OnInit {
  activeTab: any = 'Upcomming';
  constructor() {}

  ngOnInit() {}
  chageViewAppoinment(event) {
    this.activeTab = event.detail.value;
  }
}
