import { Component } from '@angular/core';
import { IpTable } from './features/ip-table/components/ip-table/ip-table';

@Component({
  selector: 'app-root',
  imports: [IpTable],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
