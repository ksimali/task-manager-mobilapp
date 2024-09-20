import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.scss'
})
export class FirstComponentComponent {
  @Input() title: string = "TEST 3";
  @Output() changeTitle = new EventEmitter<string>();

  isVisible = false;
  items = ["Element 1", "Element 2", "Element 3"];
  status = "inactive";
  isActive = false;
  color = "blue";
  fontSize = 20;

  change(){
    console.log("Button clicked");
    this.isVisible = !this.isVisible;
    this.status = "active";
    this.isActive = !this.isActive;
    this.color = "red";
    this.fontSize = 50;
    this.changeTitle.emit("Changed");
  }
}
