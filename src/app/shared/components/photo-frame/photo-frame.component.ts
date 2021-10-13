import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Subject} from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})

export class PhotoFrameComponent implements OnInit, OnDestroy {

  @Input()
  public description: string;

  @Input()
  public src: string;

  @Input()
  public likes = 0;

  @Output()
  public liked: EventEmitter<void> = new EventEmitter();

  private debounceSubject: Subject<void> = new Subject<void>();
  private unsubscribe: Subject<void> = new Subject<void>();

  public ngOnInit() {
    this.debounceSubject
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.liked.emit());

  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public like() {
    this.debounceSubject.next();
  }
}
