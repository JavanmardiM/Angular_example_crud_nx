import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export type DrawerAction = 'open' | 'close';

export abstract class DrawerEvent {
  abstract readonly action: DrawerAction;

  private _payload?: any;

  public getPayload() {
    return this._payload;
  }

  constructor(payload?: any) {
    this._payload = payload;
  }
}

export class OpenDrawerEvent extends DrawerEvent {
  readonly action: DrawerAction = 'open';

  constructor(payload?: any) {
    super(payload);
  }
}

export class CloseDrawerEvent extends DrawerEvent {
  readonly action: DrawerAction = 'close';

  constructor(payload?: any) {
    super(payload);
  }
}

@Injectable()
export class EmployeeDrawerService {
  private _event = new Subject<DrawerEvent>();

  public drawerClosed(): Observable<CloseDrawerEvent> {
    return this._event.pipe(filter(e => e instanceof CloseDrawerEvent));
  }

  public drawerOpened(): Observable<OpenDrawerEvent> {
    return this._event.pipe(filter(e => e instanceof OpenDrawerEvent));
  }

  public changeDrawerState(event: DrawerEvent) {
    this._event.next(event);
  }
}

type ViewFlag = null | 'edit';

@Injectable()
export class DataService {
  private flagSource = new BehaviorSubject(null);
  currentFlag = this.flagSource.asObservable();

  constructor() {}

  changeFlag(flag: ViewFlag) {
    this.flagSource.next(flag);
  }
}
