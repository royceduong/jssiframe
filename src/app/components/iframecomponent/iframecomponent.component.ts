import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-iframecomponent',
  templateUrl: './iframecomponent.component.html',
  styleUrls: ['./iframecomponent.component.css']
})
export class IframecomponentComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  link: string;
  results: any;
  constructor() {
    //Event Listener for postMessage() from iframe.
    if (window.addEventListener) {
      window.addEventListener("message", this.recieveMessage.bind(this), false)
    }
  }

  ngOnInit() {
    this.link = "http://localhost:49511/Tools/GCLinerTool?tab=Geometry";
    //this.link = "http://localhost:4200/assets/iframepage.html";
  }

  //Callback function to process data from window.
  recieveMessage = (event: MessageEvent) => {
    if (typeof event.data === "string") {
      this.results = event.data
    }
    else if (event.data.data == undefined) {
      this.results = undefined;
    }
  }

  //Send postMessage() to iframe
  myFunction() {
    var message = Math.random()
    var iframe = document.getElementById("iframeComponent")
    var iWindow = (<HTMLIFrameElement>iframe).contentWindow;
    iWindow.postMessage(message, "*")
  }
}
