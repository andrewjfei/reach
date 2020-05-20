import { Component, OnInit, Input } from '@angular/core';

import { PriorityQueue } from '../../classes/PriorityQueue';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() selectedNode: string;

  grid: any[][] = [];
  vertices: any = {};
  edges: any = {};
  startNode: string;
  targetNode: string;
  
  changeNode: boolean = false;

  nodeType: object = {
    'empty': {
      'colour': 'grey'
    },
    'start': {
      'colour': 'yellow'
    },
    'target': {
      'colour': 'orange'
    },
    'wall': {
      'colour': 'blue'
    }
  }

  constructor() {}

  ngOnInit() {
    this.initialiseGrid();
  }

  initialiseGrid() {
    this.grid = [];
    this.vertices = {};
    this.edges = {};
    this.startNode = undefined;
    this.targetNode = undefined;
    this.intialiseVertices();
    this.initialiseEdges();
  }

  intialiseVertices() {
    for (let i = 0; i < 18; i++) {
      let row = [];
      for (let j = 0; j < 34; j++) {
        let node = 'node ' + i + '-' + j;
        this.vertices[node] = this.nodeType['empty'];
        this.edges[node] = [];
        row.push(node);
      }
      this.grid.push(row);
    }
  }

  initialiseEdges() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {

        let node = 'node ' + row + '-' + col;

        if (row === 0) {
          this.edges[node].push({ 'node': this.grid[row + 1][col], 'weight': 1 });

          if (col !== 0 && col !== this.grid[0].length - 1) {
            this.edges[node].push({ 'node': this.grid[row][col - 1], 'weight': 1 });
            this.edges[node].push({ 'node': this.grid[row][col + 1], 'weight': 1 });
          }

        } 
        
        if (col === 0) {
          this.edges[node].push({ 'node': this.grid[row][col + 1], 'weight': 1 });

          if (row !== 0 && row !== this.grid.length - 1) {
            this.edges[node].push({ 'node': this.grid[row - 1][col], 'weight': 1 });
            this.edges[node].push({ 'node': this.grid[row + 1][col], 'weight': 1 });
          }

        } 

        if (row === this.grid.length - 1) {
          this.edges[node].push({ 'node': this.grid[row - 1][col], 'weight': 1 });

          if (col !== 0 && col !== this.grid[0].length - 1) {
            this.edges[node].push({ 'node': this.grid[row][col - 1], 'weight': 1 });
            this.edges[node].push({ 'node': this.grid[row][col + 1], 'weight': 1 });
          }

        }

        if (col === this.grid[0].length - 1) {
          this.edges[node].push({ 'node': this.grid[row][col - 1], 'weight': 1 });

          if (row !== 0 && row !== this.grid.length - 1) {
            this.edges[node].push({ 'node': this.grid[row - 1][col], 'weight': 1 });
            this.edges[node].push({ 'node': this.grid[row + 1][col], 'weight': 1 });
          }

        }

        if (row !== 0 && row !== this.grid.length - 1 && col !== 0 && col !== this.grid[0].length - 1) {
          this.edges[node].push({ 'node': this.grid[row + 1][col], 'weight': 1 });
          this.edges[node].push({ 'node': this.grid[row][col + 1], 'weight': 1 });
          this.edges[node].push({ 'node': this.grid[row - 1][col], 'weight': 1 });
          this.edges[node].push({ 'node': this.grid[row][col - 1], 'weight': 1 });
        }
      }
    }
  }

  dikjstrasAlgorithim(startNode: string, targetNode: string) {
    let distances = {};
    let pathTo = {};

    distances[startNode] = 0;
    pathTo[startNode] = [startNode];
    let pq = new PriorityQueue();
    pq.enqueue(startNode, distances[startNode]);
    this.grid.forEach((row: Array<string>) => {
        row.forEach((node: string) => {
          if (node !== startNode) {
            distances[node] = Infinity;
            pathTo[node] = 'None';
          };
        })
    });

    while (!pq.isEmpty()) {
        let minNode = pq.dequeue();
        this.edges[minNode['element']].forEach((node) => {
            let altPathWeight = distances[minNode['element']] + node.weight;
            if (altPathWeight < distances[node.node]) {
                distances[node.node] = altPathWeight;
                // deep copy of the array to new variable
                pathTo[node.node] = Array.from(pathTo[minNode['element']]);
                pathTo[node.node].push(node.node);
                pq.enqueue(node.node, distances[node]);
            }
        });
    }

    console.log(pathTo[targetNode]);

    if (pathTo[targetNode] == 'None') {
      window.alert('No path from start node to target node.');
    } else {
      pathTo[targetNode].forEach((node: string) => {
        this.vertices[node] = this.nodeType['target'];
      });
    }
  }

  toggleDefaultButton() {
    if ( document.getElementById('cg-btn').classList.contains('hide')) {
      document.getElementById('cg-btn').classList.remove('hide');
      document.getElementById('bs-btn').classList.add('hide');  
    } else {
      document.getElementById('cg-btn').classList.add('hide');
      document.getElementById('bs-btn').classList.remove('hide');  
    }
  }

  toggleChangeNode(handleItemSelected: boolean, event: any) {
    this.changeNode = !this.changeNode;
    if (handleItemSelected) {
      this.handleItemSelected(event);
    }
  }

  handleItemSelected(event: any) {
    if (this.changeNode) {
      const node = 'node ' + event.target.id;
      const position = event.target.id.split('-');
      const row = position[0];
      const col = position[1];

      if (node === this.startNode) {
        this.startNode = undefined;
      } else if (node === this.targetNode) {
        this.targetNode = undefined;
      }

      const code = this.vertices[node];
      if (code === this.nodeType[this.selectedNode]) {
        if (this.selectedNode === 'wall') {
          this.addToEdges(event.target.id);
        }
        this.vertices[node] = this.nodeType['empty'];
      } else {
        // check that a start/target node has already been selected
        if (this.selectedNode === 'start') {
          if (this.startNode === undefined) {
            this.vertices[node] = this.nodeType[this.selectedNode];
            this.startNode = node;
          } else {
            window.alert('There can only be one start node.');
          }
        } else if (this.selectedNode === 'target') {
          if (this.targetNode === undefined) {
            this.vertices[node] = this.nodeType[this.selectedNode];
            this.targetNode = node;
          } else {
            window.alert('There can only be one target node.');
          }
        } else if (this.selectedNode === 'wall') {
          this.vertices[node] = this.nodeType[this.selectedNode];
          this.removeFromEdges(event.target.id);
        } else {
          this.vertices[node] = this.nodeType[this.selectedNode];
        }

      }
    }
  }

  removeFromEdges(id: string) {
    const node = 'node ' + id;
    const position = id.split('-');
    const row = parseInt(position[0]);
    const col = parseInt(position[1]);

    if (row === 0) {
      this.removeNode(node, this.edges['node ' + (row + 1) + '-' + col]);

      if (col !== 0 && col !== this.grid[0].length - 1) {
        this.removeNode(node, this.edges['node ' + row + '-' + (col - 1)]);
        this.removeNode(node, this.edges['node ' + row + '-' + (col + 1)]);
      }

    } 
    
    if (col === 0) {
      this.removeNode(node, this.edges['node ' + row + '-' + (col + 1)]);

      if (row !== 0 && row !== this.grid.length - 1) {
        this.removeNode(node, this.edges['node ' + (row - 1) + '-' + col]);
        this.removeNode(node, this.edges['node ' + (row + 1) + '-' + col]);
      }

    } 

    if (row === this.grid.length - 1) {
      this.removeNode(node, this.edges['node ' + (row - 1) + '-' + col]);

      if (col !== 0 && col !== this.grid[0].length - 1) {
        this.removeNode(node, this.edges['node ' + row + '-' + (col - 1)]);
        this.removeNode(node, this.edges['node ' + row + '-' + (col + 1)]);
      }

    }

    if (col === this.grid[0].length - 1) {
      this.removeNode(node, this.edges['node ' + row + '-' + (col - 1)]);

      if (row !== 0 && row !== this.grid.length - 1) {
        this.removeNode(node, this.edges['node ' + (row - 1) + '-' + col]);
        this.removeNode(node, this.edges['node ' + (row + 1) + '-' + col]);
      }

    }

    if (row !== 0 && row !== this.grid.length - 1 && col !== 0 && col !== this.grid[0].length - 1) {
      this.removeNode(node, this.edges['node ' + (row - 1) + '-' + col]);
      this.removeNode(node, this.edges['node ' + (row + 1) + '-' + col]);
      this.removeNode(node, this.edges['node ' + row + '-' + (col - 1)]);
      this.removeNode(node, this.edges['node ' + row + '-' + (col + 1)]);
    }
  }

  removeNode(node: string, array: Array<any>) {
    array.forEach((obj, i) => {
      if (obj.node === node) {
        array.splice(i, 1);
      };
    });
  }

  addToEdges(id: string) {
    const node = 'node ' + id;
    const position = id.split('-');
    const row = parseInt(position[0]);
    const col = parseInt(position[1]);

    if (row === 0) {
      this.edges['node ' + (row + 1) + '-' + col].push({ 'node': node, 'weight': 1 });

      if (col !== 0 && col !== this.grid[0].length - 1) {
        this.edges['node ' + row + '-' + (col - 1)].push({ 'node': node, 'weight': 1 });
        this.edges['node ' + row + '-' + (col + 1)].push({ 'node': node, 'weight': 1 });
      }

    } 
    
    if (col === 0) {
      this.edges['node ' + row + '-' + (col + 1)].push({ 'node': node, 'weight': 1 });

      if (row !== 0 && row !== this.grid.length - 1) {
        this.edges['node ' + (row - 1) + '-' + col].push({ 'node': node, 'weight': 1 });
        this.edges['node ' + (row + 1) + '-' + col].push({ 'node': node, 'weight': 1 });
      }

    } 

    if (row === this.grid.length - 1) {
      this.edges['node ' + (row - 1) + '-' + col].push({ 'node': node, 'weight': 1 });

      if (col !== 0 && col !== this.grid[0].length - 1) {
        this.edges['node ' + row + '-' + (col - 1)].push({ 'node': node, 'weight': 1 });
        this.edges['node ' + row + '-' + (col + 1)].push({ 'node': node, 'weight': 1 });
      }

    }

    if (col === this.grid[0].length - 1) {
      this.edges['node ' + row + '-' + (col - 1)].push({ 'node': node, 'weight': 1 });

      if (row !== 0 && row !== this.grid.length - 1) {
        this.edges['node ' + (row - 1) + '-' + col].push({ 'node': node, 'weight': 1 });
        this.edges['node ' + (row + 1) + '-' + col].push({ 'node': node, 'weight': 1 });
      }

    }

    if (row !== 0 && row !== this.grid.length - 1 && col !== 0 && col !== this.grid[0].length - 1) {
      this.edges['node ' + (row - 1) + '-' + col].push({ 'node': node, 'weight': 1 });
      this.edges['node ' + (row + 1) + '-' + col].push({ 'node': node, 'weight': 1 });
      this.edges['node ' + row + '-' + (col - 1)].push({ 'node': node, 'weight': 1 });
      this.edges['node ' + row + '-' + (col + 1)].push({ 'node': node, 'weight': 1 });
    }
  }

}
