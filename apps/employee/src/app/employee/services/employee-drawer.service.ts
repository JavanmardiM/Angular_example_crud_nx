import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export type DrawerAction = 'open' | 'close';

export abstract class DrawerEvent<T> {
  abstract readonly action: DrawerAction;
  abstract target: string;

  private _payload?: T;

  public getPayload<R extends T>(): R {
    return this._payload as R;
  }

  constructor(payload?: any) {
    this._payload = payload;
  }
}

export class OpenDrawerEvent<T> extends DrawerEvent<T> {
  readonly action: DrawerAction = 'open';

  constructor(
    public target: string,
    payload?: T
  ) {
    super(payload);
  }
}

export class CloseDrawerEvent<T> extends DrawerEvent<T> {
  readonly action: DrawerAction = 'close';

  constructor(
    public target: string,
    payload?: T
  ) {
    super(payload);
  }
}

@Injectable()
export class EmployeeDrawerService {
private _event = new Subject<DrawerEvent<any>>();

  public drawerClosed<T>(): Observable<CloseDrawerEvent<T>> {
    return this._event.pipe(filter(e => e instanceof CloseDrawerEvent));
  }

  public drawerOpened<T>(): Observable<OpenDrawerEvent<T>> {
    return this._event.pipe(filter(e => e instanceof OpenDrawerEvent));
  }

  public changeDrawerState<T>(event: DrawerEvent<T>) {
    this._event.next(event);
  }

}




