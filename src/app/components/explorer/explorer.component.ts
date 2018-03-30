import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent {

  _node: any;
  get node() {
    return this._node;
  }
  @Input('node')
  set node(node) {
    this._node = node;
    this.stateIndex = 0;

    if (this._node) {
      this._node.states.forEach(s => {
        s.machine.memory = s.machine.memory.map(m => m === '0' ? parseInt(m) : m);
      });

      this._node.states.forEach(s => {
        s.accounts.forEach(a => {
          a.storageKeys = Object.keys(a.storage);
        });
      });
    }
  }

  stateIndex = 0;

  stepBack() {
    this.stateIndex -= 1;
    if (this.stateIndex < 0) { this.stateIndex = 0; }
  }

  stepForward() {
    this.stateIndex += 1;
    if (this.stateIndex > this.node.states.length - 1) { this.stateIndex = this.node.states.length - 1; }
  }

}
