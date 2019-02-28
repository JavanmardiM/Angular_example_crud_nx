import {
  Component,
  OnInit,
  Injector,
  ViewChild,
  Input,
  ElementRef,
  OnDestroy,
  HostBinding,
  forwardRef,
  Self,
  Optional
} from '@angular/core';
import { Overlay, ConnectedPosition } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { MatFormFieldControl, ErrorStateMatcher } from '@angular/material';
import {
  NgControl,
  FormBuilder,
  FormGroup,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

import { MAT_PERSIAN_DATEPICKER_DATE, MAT_PERSIAN_DATEPICKER_CURRENT_DATE } from '../tavsys-persian-datepicker.tokens';
import { TavsysPersianDatepickerRef } from '../tavsys-persian-datepicker-ref';
import { PersianCalendarComponent } from '../persian-calendar/persian-calendar.component';

const DEFAULT_POSITION: ConnectedPosition = {
  originX: 'end',
  originY: 'bottom',
  overlayX: 'end',
  overlayY: 'bottom'
};

@Component({
  selector: 'tav-persian-datepicker',
  templateUrl: './persian-datepicker.component.html',
  styleUrls: ['./persian-datepicker.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: PersianDatepickerComponent }
  ],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class PersianDatepickerComponent
  implements OnInit, OnDestroy, MatFormFieldControl<any>, ControlValueAccessor {
  static nextId = 0;

  @ViewChild('datepicker') datepickerInput: ElementRef;
  @HostBinding('attr.aria-describedby') describedBy = '';

  stateChanges = new Subject<void>();
  focused: boolean = false;
  errorState: boolean = false;
  id: string = `tav-persian-datepicker-${PersianDatepickerComponent.nextId++}`;
  form: FormGroup;

  datepickerRef?: TavsysPersianDatepickerRef;
  isOpen: boolean = false;

  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  private _controlValueAccessorChangeFn: (value: any) => void = () => {};
  public onTouchFn: () => void = () => {};

  get empty() {
    const {
      value: { date }
    } = this.form;

    return !date;
  }

  get shouldLabelFloat() {
    // return true;
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): string | null {
    const {
      value: { date }
    } = this.form;
    return date;
  }
  set value(date: string | null) {
    this.form.setValue({ date: date });
    this.stateChanges.next();
  }

  @Input()
  public get startAt() : string {
    return this._startAt;
  }
  public set startAt(date : string | null) {
    this._startAt = date;
  }
  private _startAt?: string;

  @Input()
  public get errorStateMatcher() : ErrorStateMatcher | null {
    return this._errorStateMatcher;
  }
  public set errorStateMatcher(matcher : ErrorStateMatcher | null) {
    this._errorStateMatcher = matcher;
  }
  private _errorStateMatcher?: ErrorStateMatcher;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    private overlay: Overlay,
    private injector: Injector,
    private elRef: ElementRef<HTMLElement>,
    private fm: FocusMonitor,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      date: ''
    });

    this.form.valueChanges.subscribe(value => {
      this._controlValueAccessorChangeFn(value.date);
    });

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if(ngControl != null) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if(this.ngControl) {
      this.ngControl.statusChanges.subscribe(status => {
        if(this.errorStateMatcher != null) {
          this.errorState = status == 'INVALID' || this.errorStateMatcher.isErrorState(this.ngControl.control as FormControl, null);
        } else {
          this.errorState = status == 'INVALID';
        }
      });
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input')!.focus();
    }
  }

  onInputBlur(): void {
    this.onTouchFn();
    if(this.ngControl) {
      this.ngControl.control.updateValueAndValidity();
    }
  }

  open() {
    const overlayRef = this.createOverlay();
    this.datepickerRef = new TavsysPersianDatepickerRef(overlayRef);
    const portalInjector = this.createInjector(this.datepickerRef);
    const persianDatepciker = new ComponentPortal(
      PersianCalendarComponent,
      null,
      portalInjector
    );
    const componentRef = overlayRef.attach(persianDatepciker);

    this.datepickerRef.componentInstance = componentRef.instance;

    this.datepickerRef.afterClosed().subscribe(date => {
      this.value = date;
      this._controlValueAccessorChangeFn(date);
      this.isOpen = false;
    });

    overlayRef.backdropClick().subscribe(_ => {
      this.isOpen = false;
      this.datepickerRef.close(this.datepickerRef.componentInstance.selectedDate)
    });

    this.isOpen = true;
  }

  close() : void {
    if(!!this.datepickerRef) {
      this.datepickerRef.close(null);
    }
  }

  private createOverlay() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.datepickerInput)
      .withPositions([DEFAULT_POSITION]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const overlayRef = this.overlay.create({
      width: 320,
      hasBackdrop: true,
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy
    });

    return overlayRef;
  }

  private createInjector(datepickerRef: TavsysPersianDatepickerRef) {
    const injectorTokens = new WeakMap();

    injectorTokens.set(TavsysPersianDatepickerRef, datepickerRef);
    injectorTokens.set(MAT_PERSIAN_DATEPICKER_DATE, this.value);
    if(this.startAt) {
      injectorTokens.set(MAT_PERSIAN_DATEPICKER_CURRENT_DATE, this.startAt);
    }

    return new PortalInjector(this.injector, injectorTokens);
  }

  writeValue(date: string): void {
    this.value = date;
  }

  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
