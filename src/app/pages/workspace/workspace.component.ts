import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StatespaceService } from '../../services/statespace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  statespace: any;
  selectedNode: any;

  constructor(private service: StatespaceService, private router: Router) { }

  ngOnInit() {
    this.statespace = this.service.get();
    // If no statespace is saved, redirect to the upload page
    if (!this.statespace) {
      this.router.navigate(['upload']);
    }
  }

  onNodeSelected(node) {
    this.selectedNode = node;
  }

}
