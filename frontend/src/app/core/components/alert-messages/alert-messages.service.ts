import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AlertMessage } from '../../models';

@Injectable()
export class AlertMessagesService {
  private subject = new Subject<AlertMessage>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  public success(message: string, keepAfterNavigationChange = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  public error(message: string, keepAfterNavigationChange = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  public getMessage(): Observable<AlertMessage> {
    return this.subject.asObservable();
  }
}
