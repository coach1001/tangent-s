import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TableFilterStatesService } from '../../services/table-filter-states.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() columns:any;
  @Input() rows:any;
  @Input() rowAction:any;
  @Input() name:string;

  flattenedRows:any = [];
  filteredRows:any = [];
  filters:any = [];
  dropdown:any = [];

  constructor(private router:Router, private tableFilterStates:TableFilterStatesService) { }

  ngOnInit() {
    this.rows.map((row) => {
      let new_row = {};
      this.columns.map((col)=> {        
        new_row[col.prop] = this.getValue(row, col.prop)
        if (typeof(col.visible) === 'undefined') {
          col.visible = true;
        }
      })
      this.flattenedRows.push(new_row);
    })
    this.filteredRows = this.flattenedRows.slice(0);
    this.columns.map((col) => {
      col.sort = false;
      col.sortDirection = true;
    })
    this.filters = this.tableFilterStates.getTableFilters(this.name);
    this.filter_();    
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

  rowAction_(r) {
    if (typeof this.rowAction === 'undefined') {      
    } else {      
      this.tableFilterStates.setTableFilters(this.name, this.filters.slice(0));        
      this.router.navigate([`${this.rowAction.route}/${r[this.rowAction.paramProp]}`]);
    }
  }

  setFilterProp(prop:string, name:string, i:number) {
    this.filters[i].prop = prop;
    this.filters[i].name = name;
    this.dropdown[i] = false;
    this.filter_();
  }

  sort_(i:number, changeDirection:boolean) {    
    this.columns.map((col) => {
      col.sort = false;
    })
    this.columns[i].sort = true;
    if(changeDirection)
     this.columns[i].sortDirection = !this.columns[i].sortDirection;
    
    this.filteredRows.sort((a, b) => {      
      if(a[this.columns[i].prop] > b[this.columns[i].prop]) {
        return this.columns[i].sortDirection ? -1 : 1;
      } else {
        return this.columns[i].sortDirection ? 1 : -1;
      }
    })
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
              rowsToKeep.push(rowsCopy[j]);break;
            } else {              
              let cellValue = String(rowsCopy[j][this.columns[k].prop]).toLowerCase();
              let filterValue = String(this.filters[i].value).toLowerCase();
              if( cellValue.indexOf(filterValue) !== -1) {
                rowsToKeep.push(rowsCopy[j]);
                break;
              }
            }
          } else {
            if(this.columns[k].prop === this.filters[i].prop) {
              
              let cellValue = String(rowsCopy[j][this.columns[k].prop]).toLowerCase();
              let filterValue = String(this.filters[i].value).toLowerCase();
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
    this.columns.map((col, i) => {
      if(col.sort) {
        this.sort_(i, false);
      }
    })
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