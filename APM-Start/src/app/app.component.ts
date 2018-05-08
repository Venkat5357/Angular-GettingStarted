import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular: Getting Started';
}


 /*
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    console.log(this.paginator.getNumberOfPages());
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelectedOriginal() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleOriginal() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  handlePageEvents(event: PageEvent) {
    this.selection = new SelectionModel<any>(true, []);
  }

  handleSortEvents(sort: Sort) {
    console.log('calling handleSortEvents....');
    this.selection = new SelectionModel<any>(true, []);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    console.log(
      'this.selection.selected.length' + this.selection.selected.length
    );
    const numRows = this.dataSource._orderData(this.dataSource.data).length;
    console.log(
      'paginated data length' +
        this.dataSource._orderData(this.dataSource.data).length
    );
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log(this.selection.selected);
    this.isAllSelected() ? this.selection.clear() : this.setPageData();
  }

  clearSelection() {
    this.selection.clear();
  }

  setPageData() {
    const data = this.dataSource._pageData(this.dataSource.data);
    data.forEach(row => this.selection.select(row));
  }

  getSelectedRecords() {
    const list = this.selection.selected;
    for (const value of list) {
      console.log(value.id);
    }
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      console.log('selected item ' + item.length);
      this.dataSource.data.splice(item.position - 1, 1);
      this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
    });
    this.selection = new SelectionModel<any>(true, []);
  }

  getRowDetails(data: any) {
    console.log(data);
  }

  handleEvents(event: any) {
    console.log(event);
  }

}
