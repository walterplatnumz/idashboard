import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {isArray} from "rxjs/util/isArray";
import {INITIAL_LAYOUT_MODEL} from '../../model/layout-model';
import {DragulaService} from 'ng2-dragula';

export interface Header {
  name: string;
  column:string;
  type?:string;
  hidden?:boolean;
  meta?:boolean;
}

export interface Configuration {
  multiple: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @Input() layoutModel = INITIAL_LAYOUT_MODEL;
  @Input() visualizationType: string;
  @Output() onLayoutUpdate = new EventEmitter();
  @Output() onLayoutClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  filters: any;
  columns: any;
  rows: any;
  icons: any;
  dimensions: any;
  columnName: string;
  rowName: string;
  constructor(private dragulaService: DragulaService) {
    this.icons = {
      dx: 'assets/img/data.png',
      ou: 'assets/img/tree.png',
      pe: 'assets/img/period.png'
    };

    this.dimensions = {
      filterDimension: [],
      columnDimension: [],
      rowDimension: []
    };
    this.columnName = 'Columns';
    this.rowName = 'Rows'
  }

  ngOnInit() {
    this.updateLayoutDimensions();
    if (this.visualizationType === 'CHART') {
      this.rowName = 'Series (Y-Axis)';
      this.columnName = 'Categories (X-axis)';
    }
  }

  onDrop(event, dimension) {
    this.layoutModel[event.dragData.dimension].splice(this.layoutModel[event.dragData.dimension].indexOf(event.dragData.data), 1);
    this.layoutModel[dimension].push(event.dragData.data)
  }

  updateLayoutDimensions() {
    this.filters = this.layoutModel.filters;
    this.columns = this.layoutModel.columns;
    this.rows = this.layoutModel.rows;
  }

  updateLayout() {
    console.log(this.filters, this.rows, this.columns)
    this.onLayoutUpdate.emit(this.layoutModel);
  }

  close() {
    this.onLayoutClose.emit(true)
  }
}
