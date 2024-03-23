import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualpageService {

  private currentPageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  setCurrentPage(page: string) {
    this.currentPageSubject.next(page);
  }

  getCurrentPage(): Observable<string> {
    return this.currentPageSubject.asObservable();
  }

}
