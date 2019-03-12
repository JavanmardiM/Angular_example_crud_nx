import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment-jalaali';

const PERSIAN_DATE_FORMAT = 'jYYYY/jM/jD';
const NATIONAL_CODE_PATTERN = /^\d{10,11}/;
const PERSIAN_DATE_PATTERN = /^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/;
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}

export class TavsysValidators {
  /**
   * Validator that performs email validation.
   */
  static email(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return EMAIL_PATTERN.test(control.value) ? null : { email: true };
  }

  static time(control: AbstractControl): ValidationErrors | null {
    if(isEmptyInputValue(control.value)) {
      return null;
    }

    const TIME_PATTERN = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
    return TIME_PATTERN.test(control.value) ? null : { time: true };
  }

  static persiandate(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }

    try {
      if (
        moment(control.value, PERSIAN_DATE_FORMAT).isValid() &&
        PERSIAN_DATE_PATTERN.test(control.value)
      ) {
        return null;
      }

      return { persiandate: true };
    } catch {
      return { persiandate: true };
    }
  }

  static persianDateBeforeToday(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }

    try {
      const date = moment(control.value, PERSIAN_DATE_FORMAT);
      const today = moment();
      if (
        date.isValid() &&
        PERSIAN_DATE_PATTERN.test(control.value) &&
        date.isBefore(today)
      ) {
        return null;
      }

      return { persianDateBeforeToday: true };
    } catch {
      return { persianDateBeforeToday: true };
    }
  }

  static persianDateSameOrAfterToday(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }

    try {
      const today = moment(moment().format('YYYY/MM/DD'), 'YYYY/MM/DD');
      const date = moment(control.value, PERSIAN_DATE_FORMAT);

      if (
        date.isValid() &&
        PERSIAN_DATE_PATTERN.test(control.value) &&
        date.isSameOrAfter(today)
      ) {
        return null;
      }

      return { persianDateSameOrAfterToday: true };
    } catch {
      return { persianDateSameOrAfterToday: true };
    }
  }

  static mobile(control: AbstractControl): ValidationErrors | null {
    const mobileNumber = control.value;
    //در صورتی که کد ملی وارد شده تهی باشد

    if (isEmptyInputValue(mobileNumber)) {
      return null;
    }

    const mobileRegex = /^(\+98|0)?9\d{9}$/;
    if(!mobileRegex.test(mobileNumber)) {
      return { mobile: true }
    }
  }

  static nationalcode(control: AbstractControl): ValidationErrors | null {
    const nationalCode = control.value;
    //در صورتی که کد ملی وارد شده تهی باشد

    if (isEmptyInputValue(nationalCode)) {
      return null;
    }

    //در صورتی که کد ملی وارد شده طولش کمتر از 10 رقم باشد
    if (nationalCode.length != 10) {
      return { nationalcode: true };
    }

    //در صورتی که کد ملی ده رقم عددی نباشد
    var regex = /\d{10}/;
    if (!regex.test(nationalCode)) {
      return { nationalcode: true };
    }

    //در صورتی که رقم‌های کد ملی وارد شده یکسان باشد
    var allDigitEqual = [
      '0000000000',
      '1111111111',
      '2222222222',
      '3333333333',
      '4444444444',
      '5555555555',
      '6666666666',
      '7777777777',
      '8888888888',
      '9999999999'
    ];
    if (allDigitEqual.includes(nationalCode)) {
      return { nationalcode: true };
    }

    //عملیات شرح داده شده در بالا
    var chArray = nationalCode.split('');
    var num0 = parseInt(chArray[0], 10) * 10;
    var num2 = parseInt(chArray[1], 10) * 9;
    var num3 = parseInt(chArray[2], 10) * 8;
    var num4 = parseInt(chArray[3], 10) * 7;
    var num5 = parseInt(chArray[4], 10) * 6;
    var num6 = parseInt(chArray[5], 10) * 5;
    var num7 = parseInt(chArray[6], 10) * 4;
    var num8 = parseInt(chArray[7], 10) * 3;
    var num9 = parseInt(chArray[8], 10) * 2;
    var a = parseInt(chArray[9], 10);

    var b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
    var c = b % 11;
    const valid = (c < 2 && a == c) || (c >= 2 && 11 - c == a);

    if (!valid) {
      return { nationalcode: true };
    }

    return null;
  }

  static oldnationalcode(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }

    debugger;
    let code = control.value as string;
    const length = control.value.length;
    const checkControlDigit = (nationalCode: string): boolean => {
      let remains,
        result = 0;
      const control = parseInt(nationalCode.substr(9, 1), 10);

      for (let i = 0; i < 9; i++) {
        const sub = nationalCode.substr(i, 1);
        result += parseInt(sub, 10) * (10 - i);
      }

      remains = result % 11;

      return (
        (remains < 2 && control == remains) ||
        (remains >= 2 && control == 11 - remains)
      );
    };

    if (length < 8 || parseInt(code, 10) == 0) {
      return { nationalcode: true };
    }

    code = ('0000' + code).substr(length + 4 - 10);

    if (parseInt(code.substr(3, 6), 10) == 0) {
      return { nationalcode: true };
    }

    if (NATIONAL_CODE_PATTERN.test(code) && checkControlDigit(code)) {
      return null;
    }

    return { nationalcode: true };
  }
}
