import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  callStatus = false;
  
  startCall() {
    this.callStatus = true;
  }

  onCallClose() {
    this.callStatus = false;
  }

}
