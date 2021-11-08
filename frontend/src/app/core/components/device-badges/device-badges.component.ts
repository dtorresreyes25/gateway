import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../../models';

@Component({
  selector: 'app-device-badges',
  templateUrl: './device-badges.component.html',
  styleUrls: ['./device-badge.component.scss'],
})
export class DeviceBadgesComponent implements OnInit {
  @Input() devices: Device[] = [];

  constructor() {}

  ngOnInit(): void {}
}
