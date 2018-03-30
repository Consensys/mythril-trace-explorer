import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

declare global {
    interface Window { Mythril: any; }
}
window.Mythril = window || {};

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @Input() statespace: any;
  @Output() nodeSelected: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.setupGraph();
  }

  setupGraph() {
    const options = {
      autoResize: true,
      width: '100%',
      manipulation: false,
      height: '90%',
      layout: {
        randomSeed: undefined,
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          levelSeparation: 450,
          nodeSpacing: 200,
          treeSpacing: 100,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: false,
          direction: 'LR',        // UD, DU, LR, RL
          sortMethod: 'directed'   // hubsize, directed
        }
      },
      nodes: {
        borderWidth: 1,
        borderWidthSelected: 2,
        chosen: true,
        shape: 'box',
        font: {
          align: 'left',
          color: '#FFFFFF',
        },
      },
      edges: {
        font: {
          color: '#ffffff',
          size: 12, // px
          face: 'arial',
          background: 'none',
          strokeWidth: 0, // px
          strokeColor: '#ffffff',
          align: 'horizontal',
          multi: false,
          vadjust: 0,
        }
      },
      physics: {
        enabled: false
      }
    };

    const container = document.getElementById('mythrilNetwork');
    const nodesSet = new window.Mythril.vis.DataSet(this.statespace.nodes);
    const edgesSet = new window.Mythril.vis.DataSet(this.statespace.edges);
    const data = {'nodes': nodesSet, 'edges': edgesSet};
    const gph = new window.Mythril.vis.Network(container, data, options);

    gph.on('click', params => {
      const nodeID = params['nodes']['0'];
      if (nodeID) {
        const clickedNode = nodesSet.get(nodeID);
        if (clickedNode.isExpanded) {
          clickedNode.label = clickedNode.truncated;
        } else {
          clickedNode.label = clickedNode.code;
        }
        clickedNode.isExpanded = !clickedNode.isExpanded;

        nodesSet.update(clickedNode);

        this.nodeSelected.emit(clickedNode);
      }
    });
  }

}
