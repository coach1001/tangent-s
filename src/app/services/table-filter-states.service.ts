import { Injectable } from '@angular/core';

@Injectable()
export class TableFilterStatesService {
  tableFilters:any = [];
  constructor() { }

  setTableFilters(name:string, filters) {        
    let updated:boolean = false;
    this.tableFilters.map((tableFilter) => {
      if(tableFilter.name === name) {
        tableFilter.filters = [];
        tableFilter.filters = filters.splice(0);
        updated = true;
      }
    })
    if(!updated) {
      this.tableFilters.push({
        name: name,
        filters: filters.splice(0)
      })
    }                
  }

  getTableFilters(name) {
    let filters = [];
    this.tableFilters.map((tableFilter) => {
      if(tableFilter.name === name) {
        filters = tableFilter.filters.splice(0);
      }
    })
    return filters;    
  }
}
