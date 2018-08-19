import { ApplicationRef, Component, ComponentFactoryResolver, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { CalendarComponent } from '../../components/calendar/calendar.component';

interface FormData {
  startDate: { year: number, month: number, day: number };
  numberDays: number;
  countryCode: string;
}

@Component({
  selector: 'app-calendar-generator',
  templateUrl: './calendar-generator.component.html',
  styleUrls: ['./calendar-generator.component.scss']
})
export class CalendarGeneratorComponent implements OnInit {
  private portalHost: DomPortalHost;
  private portal: ComponentPortal<CalendarComponent>;

  @ViewChild('calendarParent', {read: ElementRef})
  calendarParent: ElementRef;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef) { }

  ngOnInit() {
    this.createForm();

    // Create a portalHost from a DOM element
    this.portalHost = new DomPortalHost(
      this.calendarParent.nativeElement,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }

  generateCalendar() {
    if (this.portal) {
      this.portalHost.detach();
    }

    // Locate the component factory for the HeaderComponent
    this.portal = new ComponentPortal(CalendarComponent);

    // Attach portal to host
    const instance: CalendarComponent = this.portalHost.attach(this.portal).instance;

    const data: FormData = this.form.getRawValue();

    instance.startDate = new Date(data.startDate.year, data.startDate.month - 1, data.startDate.day);
    instance.numberDays = data.numberDays;
  }

  private createForm() {
    this.form = this.fb.group({
      startDate: [null, Validators.required],
      numberDays: [1, [Validators.required]],
      countryCode: ['', Validators.required]
    });
  }
}
