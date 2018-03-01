import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() columns:any;
  @Input() rows:any;

  flattenedRows:any = [];
  filteredRows:any = [];
  filters:any = [];
  dropdown:any = [];

  constructor() { }

  ngOnInit() {
    this.rows.map((row) => {
      let new_row = {};
      this.columns.map((col)=> {
        new_row[col.prop] = this.getValue(row, col.prop)
      })
      this.flattenedRows.push(new_row);
    })
    this.filteredRows = this.flattenedRows.slice(0);
  }

  toggleDropdown(i:number) {
    this.dropdown[i] = !this.dropdown[i];
  }

  addFilter() {
    this.dropdown.push(false);
    this.filters.push({prop: 'All', name: 'All', value: ''});
  }

  removeFilter(index:number) {
    this.filters.splice(index,1);
    this.filter_();
  }

  setFilterProp(prop:string, name:string, i:number) {
    this.filters[i].prop = prop;
    this.filters[i].name = name;
    this.dropdown[i] = false;
  }

  filter_() {
    let rowsCopy = this.flattenedRows.slice(0);
    let rowsToKeep = [];
    for(var i=0; i < this.filters.length; i++) {
    //FILTERS

      for(var j=0; j < rowsCopy.length; j++) {
        //ROWS
        for(var k=0; k < this.columns.length; k++) {
        //COLS
          if(this.filters[i].prop === 'All') {
            if(this.filters[i].value === '') {
              //removeRow = false;
              rowsToKeep.push(rowsCopy[j]);break;
            } else {
              let cellValue = rowsCopy[j][this.columns[k].prop].toLowerCase();
              let filterValue = this.filters[i].value.toLowerCase();
              if( cellValue.indexOf(filterValue) !== -1) {
                rowsToKeep.push(rowsCopy[j]);
                break;
              }
            }
          }
        //COLS
        }
      //ROWS
      }
      rowsCopy = rowsToKeep.slice(0);
      rowsToKeep = [];
    //FILTERS
    }
    this.filteredRows = rowsCopy.slice(0);
  }

  getValue(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
          o = o[k];
      } else {
          return;
      }
    }
    return o;
  }
}