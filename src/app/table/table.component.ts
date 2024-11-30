import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  dialog = inject(MatDialog);
  changeDef = inject(ChangeDetectorRef);
  commonService = inject(CommonService);

  displayedColumns: string[] = ['id', 'profile', 'first', 'email', 'mobile', 'action'];
  dataList: any = [];

  ngOnInit(): void { }

  openDialog(value?: any) {
    let passData = {
      mode: 'Add',
      data: {}
    }
    if (value) {
      passData = {
        mode: 'Edit',
        data: value
      }
    }
    const dialogRef = this.dialog.open(FormComponent, {
      width: '50vw',
      data: passData,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataList = [];
      const data = this.commonService.getStoreDataDetails();
      this.dataList = data.map(el =>el);
      this.changeDef.detectChanges();
    });
  }

  deleteValue(id: number) {
    this.commonService.deleteStoreDataDetails(id);
    const data = this.commonService.getStoreDataDetails();
      this.dataList = data;
  }

}
