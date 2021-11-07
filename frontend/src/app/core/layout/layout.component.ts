import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public collapedSideBar: boolean = false;

  constructor() {}

  ngOnInit() {}

  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }
}
