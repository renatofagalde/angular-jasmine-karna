import {LikeWidgetComponent} from "./like-widget.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {UniqueIdService} from "../../services/unique-id/unique-id.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

describe(LikeWidgetComponent.name, () => {

  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikeWidgetComponent],
      providers: [UniqueIdService],
      imports: [FontAwesomeModule]
      // imports: [LikeWidwetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent)
    component = fixture.componentInstance;
    // fixture.detectChanges(); // nao é boa pratica
  });

  it(`Should create component`, () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy()
  });

  it(`Should auto-generate ID during ngOnInit when (@Input id) is not assigned`, () => {
    // const component = fixture.componentInstance;
    fixture.detectChanges(); //chamar o ngonit na mao
    expect(component.id).toBeTruthy()
  });

  it(`Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned`, () => {
    const component = fixture.componentInstance;
    const someId = 'someId';
    component.id = someId;
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.likeInWidget.name} should trigger (@Output liked) when called - hard version`,
    done => {
      fixture.detectChanges();
      component.liked.subscribe(() => {
        expect(true).toBeTrue();
        done();
      });
      component.likeInWidget();
    });

  it(`#${LikeWidgetComponent.prototype.likeInWidget.name}  should trigger (@Output liked) when called - soft version`,
    () => {
      spyOn(component.liked, 'emit');
      fixture.detectChanges();
      component.likeInWidget();
      expect(component.liked.emit).toHaveBeenCalled();
    });

})
