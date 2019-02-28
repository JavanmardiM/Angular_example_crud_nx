import { OverlayRef } from "@angular/cdk/overlay";
import { AnimationEvent } from "@angular/animations";
import { Subject, Observable } from "rxjs";
import { filter, take, tap } from "rxjs/operators";
import { PersianCalendarComponent } from "./persian-calendar/persian-calendar.component";

export class TavsysPersianDatepickerRef {
  private _beforeClose = new Subject<string>();
  private _afterClosed = new Subject<string>();
  private _persianCalendarComponent: PersianCalendarComponent;
  
  public set componentInstance(persianCalendarComponent : PersianCalendarComponent) {
    this._persianCalendarComponent = persianCalendarComponent;
  }
  
  public get componentInstance() : PersianCalendarComponent {
    return this._persianCalendarComponent;
  }
  
  constructor(private overlayRef: OverlayRef) { }

  close(date: string): void {
    this.componentInstance.animationStateChanged.pipe(
      filter((event:AnimationEvent) => {return event.phaseName === 'start'}),
      take(1)
    ).subscribe(() => {
      this._beforeClose.next(date);
      this._beforeClose.complete();
      this.overlayRef.detachBackdrop();
    });

    this.componentInstance.animationStateChanged.pipe(
      filter((event:AnimationEvent) => event.phaseName === 'done' && event.toState === 'leave'),
      take(1)
    ).subscribe(() => {
      this.overlayRef.dispose();
      this._afterClosed.next(date);
      this._afterClosed.complete();

      this.componentInstance = null!;
    });

    this.componentInstance.startExitAnimation();
  }

  afterClosed(): Observable<string> {
    return this._afterClosed.asObservable();
  }

  beforeClose(): Observable<string> {
    return this._beforeClose.asObservable();
  }
}
