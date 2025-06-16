import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpTable } from './ip-table';

describe('IpTable', () => {
  let component: IpTable;
  let fixture: ComponentFixture<IpTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
