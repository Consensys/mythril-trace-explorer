import { Injectable } from '@angular/core';

@Injectable()
export class StatespaceService {

  private STATESPACE_KEY = 'statespace';

  // gets the statespace from local-storage
  get() {
    return JSON.parse(localStorage.getItem(this.STATESPACE_KEY));
  }

  // Saves the Statespace object in local storage
  save(statespace: any) {
    localStorage.setItem(this.STATESPACE_KEY, JSON.stringify(statespace));
  }

  /**
   * Validates Statespace JSON File
   * @returns {Promise<string>} validation message
   */
  validate(file: File) {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const space = JSON.parse(reader.result);
          // Perform basic validations to ensure statespace object is valid
          // These validations exist, so as to give user specific error messages if format is not as expected
          // It might come in handy if explorer tool functionality is requires upgrades in the future,
          // that in turn require changes to statespace json dump format

          // At leat 1 node to be present
          if (!space.nodes || !space.nodes.length) {
            return reject('Statespace contains no nodes!');
          }
          // Edges object should be present, and at least 1 edge if there are more than 1 nodes
          if (!space.edges || (space.nodes.length > 1 && !space.edges.length)) {
            return reject('Statespace contains no edges!');
          }
          // Edges and Nodes fields should be of type Array
          if (!Array.isArray(space.edges) || !Array.isArray(space.nodes)) {
            return reject('Edges and Nodes should be arrays');
          }
          // Validate 'color' object of every node
          if (!space.nodes.every(node => node.color && typeof node.color === 'object')) {
            return reject('Every node must contain a valid \'color\' object');
          }
          // Validate 'code' field of every node
          if (!space.nodes.every(node => node.code && node.code.length && typeof node.code === 'string')) {
            return reject('Every node must contain a valid \'code\' attribute');
          }
          // Validate 'truncated' field of every node
          if (!space.nodes.every(node => node.truncated && node.truncated.length && typeof node.truncated === 'string')) {
            return reject('Every node must contain a valid \'truncated\' attribute');
          }
          // Validate 'instructions' list of every node
          if (!space.nodes.every(node => node.instructions && node.instructions.length && Array.isArray(node.instructions))) {
            return reject('Every node must contain a non-empty \'instructions\' array');
          }
          // Validate 'states' array of every node
          if (!space.nodes.every(node => node.states && node.states.length && Array.isArray(node.states))) {
            return reject('Every node must contain a non-empty \'states\' array');
          }
          // Validate 'state.machine' array of every node
          if (!space.nodes.every(node => {
            return node.states.every(state => state.machine && state.machine.memory && Array.isArray(state.machine.memory)
                                    && state.machine.stack && Array.isArray(state.machine.stack));
          })) {
            return reject('Every state object must contain a \'memory\' and \'stack\' arrays in its \'machine\' object');
          }
          // Validate 'state.accounts' array of every node
          if (!space.nodes.every(node => {
            return node.states.every(state => state.accounts && state.accounts.length && Array.isArray(state.accounts));
          })) {
            return reject('Every state object must contain a non-empty \'accounts\' array');
          }
          // Validate 'state.accounts' array objects of every node
          if (!space.nodes.every(node => {
            return node.states.every(state => {
              return state.accounts.every(account => account.address && account.storage && typeof account.storage === 'object');
            });
          })) {
            return reject('Every account object must contain an \'address\' and a \'storage\' object');
          }
          // Validate 'to' and 'from' attributes of every edge
          if (!space.edges.every(edge => edge.to && typeof edge.to === 'string' && edge.from && typeof edge.from === 'string')) {
            return reject('Every edge must contain valid \'to\' and \'from\' strings');
          }

          return resolve(space);

        } catch (err) {
          console.log(err);
          return reject('There was an error reading your JSON. Check console for details');
        }
      };
      reader.readAsText(file);
    });

    return promise;
  }

}
