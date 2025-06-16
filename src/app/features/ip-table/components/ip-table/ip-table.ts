import { Component, OnInit } from '@angular/core';
import { ipRows } from '../../constants';
import { Route, RouteTableRow } from '../../types';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ip-table',
  imports: [CommonModule],
  templateUrl: './ip-table.html',
  styleUrl: './ip-table.scss',
})
export class IpTable implements OnInit {
  protected destinations$ = new BehaviorSubject<RouteTableRow[]>([]);
  protected sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');
  protected currentSortKey: keyof RouteTableRow | null = null;

  ngOnInit(): void {
    const rows = ipRows.map((row) => this.mapRouteToRow(row));
    this.destinations$.next(rows);
  }

  formatDestination(address: string, mask: string) {
    const maskToPrefix = (mask: string) => {
      return mask
        .split('.')
        .map(Number)
        .reduce(
          (acc, octet) => acc + octet.toString(2).split('1').length - 1,
          0,
        );
    };

    return `${address}/${maskToPrefix(mask)}`;
  }

  mapRouteToRow(route: Route): RouteTableRow {
    return {
      uuid: route.uuid,
      destination: this.formatDestination(route.address, route.mask),
      gateway: route.gateway,
      interface: route.interface,
    };
  }

  compareIpWithPrefix(ip1: string, ip2: string) {
    const [addr1, prefix1] = ip1.split('/');
    const [addr2, prefix2] = ip2.split('/');

    const ipToNum = (ip: string) =>
      ip
        .split('.')
        .map(Number)
        .reduce((acc, value) => (acc << 8) + value, 0) >>> 0;

    const num1 = ipToNum(addr1);
    const num2 = ipToNum(addr2);

    if (num1 !== num2) {
      return num1 - num2;
    }
    return Number(prefix2) - Number(prefix1);
  }

  toggleSortDirection() {
    this.sortDirection$.next(
      this.sortDirection$.value === 'asc' ? 'desc' : 'asc',
    );
  }

  sortBy(key: keyof RouteTableRow) {
    this.currentSortKey = key;
    const destinations = this.destinations$.value.slice();
    this.toggleSortDirection();
    const sortDirectionValue = this.sortDirection$.value;
    destinations.sort((a, b) => {
      const aDestination = a['destination'];
      const bDestination = b['destination'];
      if (key === 'destination' || key === 'gateway') {
        return (
          this.compareIpWithPrefix(aDestination, bDestination) *
          (sortDirectionValue === 'asc' ? 1 : -1)
        );
      }
      return (
        a['interface'].localeCompare(b['interface']) *
        (sortDirectionValue === 'asc' ? 1 : -1)
      );
    });
    this.destinations$.next(destinations);
  }

  trackByUuid(_: number, row: RouteTableRow) {
    return row.uuid;
  }
}
