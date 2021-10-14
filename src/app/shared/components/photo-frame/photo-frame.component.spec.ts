import {PhotoFrameComponent} from './photo-frame.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PhotoFrameModule} from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {

  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent = null;

  /*fixture.detectChanges(); RODAR O OnInit*/

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });
  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name}
   should trigger (@Output liked) once when called multiples times within debounce time `, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    component.like();
    tick(500);
    expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name}
   should trigger (@Output liked) two times called outside debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    tick(500);
    component.like();
    tick(500);
    expect(times).toBe(2);
  }));

  it(`(D) should display number of likes when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
    // tslint:disable-next-line:radix
    const value = parseInt(element.textContent);

    expect(value).toBe(1);
  });

  it('(D) Should update aria-label when (@Input likes)  is incremented', () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  });

  it('(D) Should update aria-label with 0  (@Input likes)  is incremented', () => {
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });
  it('(D) Should display image with stc and description when bound to properties', () => {
    const description = 'some description';
    const src = 'http://somesite.com/img.jpg';

    component.src = src;
    component.description = description;
    fixture.detectChanges();

    const img: HTMLImageElement=fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);

  });
});
