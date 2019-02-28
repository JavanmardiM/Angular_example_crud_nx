import {
  Component,
  OnInit,
  Inject,
  Optional,
  HostBinding,
  EventEmitter,
  HostListener,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { TavsysPersianDatepickerRef } from '../tavsys-persian-datepicker-ref';
import {
  MAT_PERSIAN_DATEPICKER_DATE,
  MAT_PERSIAN_DATEPICKER_CURRENT_DATE
} from '../tavsys-persian-datepicker.tokens';
import * as moment from 'moment-jalaali';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
  state,
  style,
  transition,
  animate,
  trigger,
  AnimationEvent
} from '@angular/animations';

const ENGLISH_WEEK_NAMES = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];
const PERSIAN_WEEK_NAMES = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه شنبه',
  'چهارشنبه',
  'پنج شنبه',
  'جمعه'
];
const PERSIAN_MONTH_NAMES = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
];
const WEEK_DAYS: string[] = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const PERSIAN_DATE_FORMAT = 'jYYYY/jMM/jDD';

const DATEPICKER_ANIMATION = [
  state('void, leave', style({ opacity: 0, transform: 'scale(0.7)' })),
  state('enter', style({ transform: 'none' })),
  transition(
    '* => enter',
    animate(
      '150ms cubic-bezier(0, 0, 0.2, 1)',
      style({ transform: 'none', opacity: 1 })
    )
  ),
  transition(
    '* => void, * => leave',
    animate('75ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0 }))
  )
];

interface PersianDate {
  year: number;
  month: number;
  day: number;
}

@Component({
  selector: 'tav-persian-calendar',
  templateUrl: './persian-calendar.component.html',
  styleUrls: ['./persian-calendar.component.scss'],
  animations: [trigger('slideContent', DATEPICKER_ANIMATION)],
  host: {
    class: 'tav-persian-datepicker'
  }
})
export class PersianCalendarComponent implements OnInit {
  @HostBinding('@slideContent') slideDown = 'enter';
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  currentDate: string;
  todayDate = moment().format(PERSIAN_DATE_FORMAT);
  selectedDate?: string = null;

  weekDays: string[] = WEEK_DAYS;
  monthNames: string[] = PERSIAN_MONTH_NAMES;
  years: number[] = Array.from(Array(120).keys()).map(y => y + 1310);
  dates: moment.Moment[] = [];
  daysOffset: number = 0;
  remainDays: number = 0;
  focused?: boolean;

  public get year(): number {
    const datePieces = this.currentDate.split('/');
    return parseInt(datePieces[0], 10);
  }
  public set year(year: number) {
    const { month } = this.getDatePieces();

    const m = moment(this.printDate(year, month, 1), PERSIAN_DATE_FORMAT);
    this.currentDate = m.format(PERSIAN_DATE_FORMAT);
    this.renderDays(year, month);
  }

  public get month(): number {
    const datePieces = this.currentDate.split('/');
    return parseInt(datePieces[1], 10);
  }

  public set month(month: number) {
    const { year } = this.getDatePieces();

    const m = moment(this.printDate(year, month, 1), PERSIAN_DATE_FORMAT);
    this.currentDate = m.format(PERSIAN_DATE_FORMAT);
    this.renderDays(year, month);
  }

  constructor(
    public datepickerRef: TavsysPersianDatepickerRef,
    @Inject(MAT_PERSIAN_DATEPICKER_DATE)
    @Optional()
    date: string | null,
    @Inject(MAT_PERSIAN_DATEPICKER_CURRENT_DATE)
    @Optional()
    startAt: string | null
  ) {
    if (date && this.dateValidation(date)) {
      this.selectedDate = this.currentDate = this.printDateByDate(date);
    } else {
      this.currentDate = startAt || moment().format(PERSIAN_DATE_FORMAT);
    }

    const { year, month } = this.getDatePieces();
    this.renderDays(year, month);
  }

  private dateValidation(date: string): boolean {
    const datePieces = date.split('/');
    if (datePieces.length != 3) {
      return false;
    }

    const year = parseInt(datePieces[0]);
    const month = parseInt(datePieces[1]);
    const day = parseInt(datePieces[2]);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return false;
    }

    if (!moment.jIsLeapYear(year) && month == 12 && day > 29) {
      return false;
    }

    return true;
  }

  private getDatePieces(): PersianDate {
    const datePieces = this.currentDate.split('/');
    let year = parseInt(datePieces[0], 10);
    let month = parseInt(datePieces[1], 10);
    let day = parseInt(datePieces[2], 10);

    if (Number.isNaN(year)) {
      const toDayDatePieces = this.todayDate.split('/');
      year = parseInt(toDayDatePieces[0], 10);
    }

    if (Number.isNaN(month) || month < 1 || month > 12) {
      month = 1;
    }

    if (Number.isNaN(day) || day < 1 || day > 31) {
      day = 1;
    }

    return { year: year, month: month, day: day };
  }

  today() {
    this.currentDate = moment().format(PERSIAN_DATE_FORMAT);
    const { year, month } = this.getDatePieces();
    this.renderDays(year, month);
  }

  next() {
    let { year, month } = this.getDatePieces();

    if (++month > 12) {
      ++year;
      month = 1;
    }

    const m = moment(this.printDate(year, month, 1), PERSIAN_DATE_FORMAT);
    this.currentDate = m.format(PERSIAN_DATE_FORMAT);
    this.renderDays(year, month);
  }

  previous() {
    let { year, month } = this.getDatePieces();

    if (--month < 1) {
      --year;
      month = 12;
    }

    const m = moment(this.printDate(year, month, 1), PERSIAN_DATE_FORMAT);
    this.currentDate = m.format(PERSIAN_DATE_FORMAT);
    this.renderDays(year, month);
  }

  renderDays(year: number, month: number) {
    const m = moment(this.printDate(year, month, 1), PERSIAN_DATE_FORMAT);
    const daysOfMonth = moment.jDaysInMonth(year, month - 1);
    const daysOffset = ENGLISH_WEEK_NAMES.indexOf(m.format('dddd'));

    this.dates.splice(0, this.dates.length);
    for (let day = 1; day <= daysOfMonth; day++) {
      const nextDay = moment(
        this.printDate(year, month, day),
        PERSIAN_DATE_FORMAT
      );
      this.dates.push(nextDay.format(PERSIAN_DATE_FORMAT));
    }

    this.remainDays = 42 - (daysOfMonth + daysOffset);
    this.daysOffset = daysOffset;
  }

  ngOnInit(): void {
    this.datepickerRef
      .afterClosed()
      .subscribe(() => (this.slideDown = 'leave'));
  }

  selectDate(date) {
    this.selectedDate = date;
    this.datepickerRef.close(this.selectedDate);
  }

  selectMonth(month: number): void {
    let { year } = this.getDatePieces();

    const m = moment(this.printDate(year, month, 1), PERSIAN_DATE_FORMAT);
    this.currentDate = m.format(PERSIAN_DATE_FORMAT);
    this.renderDays(year, month);
  }

  @HostListener('document:keydown', ['$event'])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.datepickerRef.close(this.selectedDate);
    }
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation() {
    this.animationState = 'leave';
  }

  private printDate(year: number, month: number, day: number): string | null {
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return null;
    }

    const result: string = `${('0000' + year).slice(-4)}/${('0' + month).slice(
      -2
    )}/${('0' + day).slice(-2)}`;

    return result;
  }

  private printDateByDate(date: string): string | null {
    const datePieces = date.split('/');
    let year = parseInt(datePieces[0], 10);
    let month = parseInt(datePieces[1], 10);
    let day = parseInt(datePieces[2], 10);

    return this.printDate(year, month, day);
  }
}
