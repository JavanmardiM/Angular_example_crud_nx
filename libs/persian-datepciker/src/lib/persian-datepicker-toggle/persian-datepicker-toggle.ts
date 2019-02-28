import { Directive, Component, ViewEncapsulation, ChangeDetectionStrategy, AfterContentInit, OnChanges, OnDestroy, SimpleChanges, Input, ContentChild, ChangeDetectorRef, Attribute } from "@angular/core";
import { PersianCalendarComponent } from "../persian-calendar/persian-calendar.component";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { MatDatepickerToggleIcon, MatDatepickerIntl } from "@angular/material";
import { PersianDatepickerComponent } from "../persian-datepicker/persian-datepicker.component";

/** Can be used to override the icon of a `matDatepickerToggle`. */
@Directive({
    selector: '[tavPersianDatepickerToggleIcon]'
})
export class PersianDatepickerToggleIcon {}

@Component({
    selector: 'tav-persian-datepicker-toggle',
    templateUrl: 'persian-datepicker-toggle.html',
    styleUrls: ['persian-datepicker-toggle.scss'],
    host: {
      'class': 'tav-persian-datepicker-toggle',
      // Clear out the native tabindex here since we forward it to the underlying button
      '[attr.tabindex]': 'null',
      '[class.tav-persian-datepicker-toggle-active]': 'datepicker && datepicker.opened',
      '[class.mat-accent]': 'datepicker && datepicker.color === "accent"',
      '[class.mat-warn]': 'datepicker && datepicker.color === "warn"',
    },
    exportAs: 'tavPersianDatepickerToggle'
})
export class PersianDatepickerToggle {
    // private _stateChanges = Subscription.EMPTY;

  /** Datepicker instance that the button will toggle. */
  @Input('for') datepicker: PersianDatepickerComponent;

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null;

  /** Whether the toggle button is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean;

  /** Custom icon set by the consumer. */
  @ContentChild(PersianDatepickerToggleIcon) _customIcon: PersianDatepickerToggleIcon;

  constructor(
    public _intl: MatDatepickerIntl,
    @Attribute('tabindex') defaultTabIndex: string) {

    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = (parsedTabIndex || parsedTabIndex === 0) ? parsedTabIndex : null;
  }

  _open(event: Event): void {
    if (this.datepicker && !this.disabled && !this.datepicker.isOpen) {
      this.datepicker.open();
      event.stopPropagation();
    }
  }
}
