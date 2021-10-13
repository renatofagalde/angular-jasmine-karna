import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})

export class PhotoFrameComponent {

  @Input()
  public description: string;

  @Input()
  public src: string;

  @Input()
  public likes = 0;

  @Output()
  public liked: EventEmitter<void> = new EventEmitter();

  public like() {
    this.liked.emit();
  }
}
