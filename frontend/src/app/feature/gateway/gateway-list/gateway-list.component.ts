import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SortType, SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { GatewayService } from '../../../core/services';
import { Router } from '@angular/router';
import { Gateway } from '../../../core/models';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss'],
})
export class GatewayListComponent
  implements AfterViewInit, OnInit, AfterViewChecked
{
  public SortType = SortType;
  public gateways: Gateway[] = [];
  public selected: Gateway[] = [];
  public SelectionType = SelectionType;
  public columns: TableColumn[] = [];
  @ViewChild('devicesTemplate') devicesTpl!: TemplateRef<any>;

  constructor(
    private gatewayService: GatewayService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}
  public getAll(): void {
    this.gatewayService.getAll().subscribe(
      (data) => {
        this.gateways = data;
      },
      () => {
        this.toastr.error('Error fetching gateways');
      }
    );
  }

  public onSelect(selected: Gateway[]): void {
    this.router.navigate(['/gateways/details/' + this.selected[0]._id]);
  }

  ngOnInit(): void {
    this.getAll();
  }

  ngAfterViewInit(): void {
    this.columns = [
      { prop: 'serial', name: 'Serial', width: 250 },
      { prop: 'human_readable_name', name: 'Name', width: 250 },
      { prop: 'ipv4_address', name: 'IP', width: 250 },
      { prop: 'devices', width: 500, cellTemplate: this.devicesTpl },
    ];
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
}
