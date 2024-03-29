export class Section {
  constructor({renderer}, selector){    
    this.renderer = renderer;
    this.container = document.querySelector(selector);   
  }
  renderItems(items) {
    items.reverse().forEach(item => {
      this.renderer(item)
    });
  }
  addItem(element) {
    this.container.prepend(element);
  }
}