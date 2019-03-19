import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

const ADMIN = {
  username: 'admin',
  password: '123456'
};

@Injectable()
export class AuthService {
  private authenticateEvent = new BehaviorSubject<boolean>(false);

  public get isAuthenticated$(): Observable<boolean> {
    return this.authenticateEvent.asObservable();
  }

  login(username: string, password: string): void {
    if(ADMIN.username === username && ADMIN.password === password) {
      this.authenticateEvent.next(true);
    }else {
      this.authenticateEvent.next(false);
    }
  }

  logout(): any {
    this.authenticateEvent.next(false);
  }
}
