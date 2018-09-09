import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'app';

  public block: boolean;

  constructor(private authenticationService: AuthenticationService,
              private deviceService: DeviceDetectorService) {}

  ngOnInit() {
    var deviceInfo = this.deviceService.getDeviceInfo();
    if (deviceInfo.browser === 'safari') {
      this.block = true;
    } else {
      this.block = false;
    }
    let currentUser = localStorage.getItem('currentUser');

    if (currentUser != null && currentUser != undefined) {
      this.authenticationService.logedIn(true);
    }
    
  }

}
