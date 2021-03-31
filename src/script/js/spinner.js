export default class search {
    constructor() {
      this.spinner = document.querySelector('.spinner-border');
    }
    hideSpinner() {
      this.spinner.classList.add('is-hidden');
    }
   showSpinner(){
    this.spinner.classList.remove('is-hidden');
   }
  }