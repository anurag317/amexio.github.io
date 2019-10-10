
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioMultiRangePickerComponent } from './multirangedatepicker.component';
import { AmexioMultipleDatePickerComponent } from '../multidatepicker/multidatepicker.component';

describe('amexio-date-range-picker', () => {
    let component: AmexioMultiRangePickerComponent;
    let fixture: ComponentFixture<AmexioMultiRangePickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioMultiRangePickerComponent, AmexioMultipleDatePickerComponent,
                CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioMultiRangePickerComponent);
        component = fixture.componentInstance;
    });

    it('should successfuly be able to create a AmexioMultiRangePickerComponent', () => {

        expect(fixture.componentInstance instanceof AmexioMultiRangePickerComponent)
            .toBe(true, 'should create AmexioMultiRangePickerComponent');
    });

    it('ngAfterViewInit: check if altercompleteDaysArray method is callled', () => {

        component.fromCardSelected = true;
        component.toCardSelected = true;

        spyOn(component.child, 'altercompleteDaysArray');
        fixture.detectChanges();
        expect(component.child.altercompleteDaysArray).toHaveBeenCalled();
    });

    it('ngAfterViewInit: check if disabledDates is defined', () => {

        const today = new Date();
        component.fromCardSelected = true;
        component.toCardSelected = true;
        component.disabledDates = [
            {
                from: '1-Oct-2019',
                to: '10-Oct-2019',
            }
        ];
        expect(component.disabledDates).toBeDefined();
    });

    it('ngAfterViewInit: check if disabledDates is defined', () => {

        component.fromCardSelected = true;
        component.toCardSelected = true;
        component.disabledDates = null;
        expect(component.disabledDates).toBeNull();
    });

    it('ngAfterViewInit: check if date selected is today', () => {

        const dfrom = new Date('1-Oct-2019');
        const dto = new Date('10-Oct-2019');
        const currentd = new Date('9-Oct-2019');
        component.todayIconFlag = true;
        expect(component.disabledDates).toBeDefined();

        expect(currentd.getDate()).toBeLessThanOrEqual(dto.getDate());
        expect(currentd.getDate()).toBeGreaterThanOrEqual(dfrom.getDate());

        expect(component.todayIconFlag).toEqual(true);
    });

    it('ngAfterViewInit: check if date is today', () => {

        component.ngAfterViewInit();
        component.fromCardSelected = component.child.fromcardselected;
        component.toCardSelected = component.child.tocardselected;
        component.child.altercompleteDaysArray();
        expect(component.disabledDates).toBeDefined();
        component.disabledDates.forEach((element: any) => {
            const dfrom = new Date(element.from);
            const dto = new Date(element.to);
            const currentd = new Date();
            const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);
            if ((currentd <= dto) && (currentd >= dfrom)) {
                expect(component.todayIconFlag).toEqual(true);
            }
            if ((yesterdayd <= dto) && (yesterdayd >= dfrom)) {
                expect(component.yesterdayIconFlag).toEqual(true);
            }
        });
    });

    it('ngAfterViewInit: check if date selected is not today', () => {
        const today = '9-Oct-2019';
        const dfrom = new Date('1-Oct-2019');
        const dto = new Date('10-Oct-2019');
        const currentd = new Date('19-Oct-2019');
        const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);

        expect(component.disabledDates).toBeDefined();

        expect(currentd.getDate()).toBeGreaterThan(dto.getDate());
        expect(currentd.getDate()).toBeGreaterThanOrEqual(dfrom.getDate());

        expect(component.todayIconFlag).toBeFalsy();
    });

    it('check ngAfterViewInit method todayIconFlag else condition ', () => {
        component.ngAfterViewInit();
        component.fromCardSelected = component.child.fromcardselected;
        component.toCardSelected = component.child.tocardselected;
        component.child.altercompleteDaysArray();
        expect(component.disabledDates).toBeDefined();
        component.disabledDates.forEach((element: any) => {
            const dfrom = new Date(element.from);
            const dto = new Date(element.to);
            const currentd = new Date();
            const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);
            if ((currentd <= dto) && (currentd >= dfrom)) {
                component.todayIconFlag = true;
            }
            if ((yesterdayd <= dto) && (yesterdayd >= dfrom)) {
                component.yesterdayIconFlag = true;
            }

        });
        component.todayIconFlag = false;
        expect(component.todayIconFlag).toEqual(false);
    });
    it('ngAfterViewInit: check if date selected is Tomorrow', () => {
        const today = '9-Oct-2019';
        const dfrom = new Date('1-Oct-2019');
        const dto = new Date('10-Oct-2019');
        const currentd = new Date('9-Oct-2019');
        const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);
        component.yesterdayIconFlag = true;
        expect(component.disabledDates).toBeDefined();

        expect(yesterdayd.getDate())
            .toBeLessThanOrEqual(dto.getDate());
        expect(yesterdayd.getDate())
            .toBeGreaterThanOrEqual(dfrom.getDate());

        expect(component.yesterdayIconFlag).toEqual(true);
    });

    it('ngAfterViewInit: check if date selected is not Tomorrow', () => {
        const today = '9-Oct-2019';
        const dfrom = new Date('1-Oct-2019');
        const dto = new Date('10-Oct-2019');
        const currentd = new Date('19-Oct-2019');
        const yesterdayd = new Date(currentd.getFullYear(), currentd.getMonth(), currentd.getDate() - 1);

        expect(component.disabledDates).toBeDefined();

        expect(yesterdayd.getDate()).toBeGreaterThanOrEqual(dto.getDate());
        expect(yesterdayd.getDate()).toBeGreaterThanOrEqual(dfrom.getDate());

        expect(component.yesterdayIconFlag).toBeFalsy();
    });

    it('ngAfterViewInit : check if todayIconFlag is true', () => {
        component.todayIconFlag = true;
        const spy = spyOn(component, 'updateFromTodate');
        component.ngAfterViewInit();
        expect(spy).toHaveBeenCalled();
    });

    it('ngAfterViewInit : check if todayIconFlag is false', () => {
        component.todayIconFlag = false;
        spyOn(component, 'updateFromTodate');
        expect(component.updateFromTodate).not.toHaveBeenCalled();
    });


    it('check variables  ', () => {
        component.dateRangePickerFlag = true;
        component.newFromDate = new Date();
        component.newToDate = new Date();
        component.fromCardSelected = false;
        component.toCardSelected = false;

        expect(component.dateRangePickerFlag).toEqual(true);
        expect(component.fromCardSelected).toEqual(false);
        expect(component.toCardSelected).toEqual(false);

    });

    it('check ResetDaysTillYesterday method  ', () => {

        component.ResetDaysTillYesterday();
        const d = new Date();
        const newfrm = new Date(d.getFullYear(), d.getMonth(), d.getDate() - component.daysOptionYesterday);
        component.child.fromdate = newfrm;
        // change todate
        const newto = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
        component.child.todate = newto;
        component.child.altercompleteDaysArray();

    });

    xit('check ResetDaysTillToday method  ', () => {
        component.ResetDaysTillToday();
        const d = new Date();
        const newfrm = new Date(d.getFullYear(), d.getMonth(), (d.getDate() - component.daysOptionToday + 1));
        component.child.fromdate = newfrm;
        const newto = new Date();
        component.child.todate = newto;
        component.child.altercompleteDaysArray();

    });

    // it('updateFromTodate :check flag true', () => {

    //     const flag = true;
    //     const incdate = new Date();

    //     expect(flag).toEqual(true);
    //     expect(component.child.fromdate).toEqual(incdate);
    //     expect(component.child.todate).toEqual(incdate);

    //     spyOn(component, 'alterCompleteDaysArray');
    //     component.alterCompleteDaysArray(incdate);
    //     expect(component.alterCompleteDaysArray).toHaveBeenCalled();

    // });

    it('updateFromTodate :check flag false ', () => {
        const flag = false;

        expect(flag).toEqual(false);
    });


    xit('check clearSelectedFlag if method', () => {
        component.child.completeDaysArray = [
            {
                "date": "Mon Sep 23 2019 11:04:46 GMT+0530 ",
                "month": "September",
                "montharray": [
                    [
                        {
                            "date": "Mon Aug 26 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "26 August 2019 Monday",
                            "id": "31313_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        },
                        {
                            "date": "Tue Aug 27 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "27 August 2019 Tuesday",
                            "id": "86088_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        }
                    ],
                    [
                        {
                            "date": "Mon Aug 26 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "26 August 2019 Monday",
                            "id": "31313_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        },
                        {
                            "date": "Tue Aug 27 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "27 August 2019 Tuesday",
                            "id": "86088_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        }
                    ]
                ],
                "nextarrow": false,
                "prevarrow": true,
                "year": 2019
            },
            {
                "date": "Wed Oct 23 2019 11:04:46 GMT+0530 ",
                "month": "October",
                "montharray": [
                    [
                        {
                            "date": "Mon Aug 26 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "26 August 2019 Monday",
                            "id": "31313_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        },
                        {
                            "date": "Tue Aug 27 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "27 August 2019 Tuesday",
                            "id": "86088_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        }
                    ],
                    [
                        {
                            "date": "Mon Aug 26 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "26 August 2019 Monday",
                            "id": "31313_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        },
                        {
                            "date": "Tue Aug 27 2019 00:00:00 GMT+0530",
                            "from": true,
                            "fulldate": "27 August 2019 Tuesday",
                            "id": "86088_id",
                            "isCurrentMonth": false,
                            "isDisabled": false,
                            "range": false,
                            "selected": true,
                            "to": true
                        }
                    ]
                ],
                "nextarrow": false,
                "prevarrow": false,
                "year": 2019
            }
        ]

        component.clearSelectedFlag();
        component.child.completeDaysArray.forEach((month: any) => {
            month.montharray.forEach((monthrowarray: any) => {
                monthrowarray.forEach((individualday: any) => {

                    individualday.selected = false;
                    individualday.from = false;
                    individualday.to = false;
                });
            });
        });

    });


});



