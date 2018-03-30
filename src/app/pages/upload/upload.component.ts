import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StatespaceService } from '../../services/statespace.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  file: File;
  validating = false;
  validationMessage: string;
  statespace: any;

  constructor(private service: StatespaceService, private router: Router) { }

  onDrop(e) {
    this.validationMessage = null;
    this.statespace = null;

    event.preventDefault();
    event.stopPropagation();

    this.file = e.dataTransfer.files[0];
    if (!this.file) { return; }

    this.validating = true;
    this.service.validate(this.file).then(statespace => {
      this.statespace = statespace;
    }).catch(message => {
      this.validationMessage = message;
    }).then(() => {
      this.validating = false;
    });

  }

  onDragover(e) {
    event.preventDefault();
    event.stopPropagation();
  }

  save() {
    this.service.save(this.statespace);
    this.router.navigate(['workspace']);
  }

}
