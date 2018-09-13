import { TestBed, async } from '@angular/core/testing';
import { AppClientComponent } from './app-client.component';
describe('AppClientComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppClientComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppClientComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'angular-shop'`, async(() => {
    const fixture = TestBed.createComponent(AppClientComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-shop');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppClientComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-shop!');
  }));
});
