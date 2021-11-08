import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gateway } from 'src/app/core/models';

@Component({
  selector: 'app-gateway-details',
  templateUrl: './gateway-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class GatewayDetailsComponent implements OnInit {
  public gateway!: Gateway;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  public edit(): void {
    this.router.navigate(['/gateways/edit/' + this.gateway._id]);
  }

  ngOnInit(): void {
    this.gateway = this.activatedRoute.snapshot.data.gatewayDetails;
  }
}
