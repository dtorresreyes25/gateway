import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertMessagesService } from './alert-messages.service';
import { AlertMessage } from '../../models';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss'],
})
export class AlertMessagesComponent {
  public message$: Observable<AlertMessage>;

  constructor(private service: AlertMessagesService) {
    this.message$ = service.getMessage();
  }
}
