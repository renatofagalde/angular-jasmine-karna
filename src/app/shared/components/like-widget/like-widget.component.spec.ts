import {LikeWidgetComponent} from './like-widget.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UniqueIdService} from '../../services/unique-id/unique-id.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

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

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // nao é boa pratica
  });

  it(`Should create component`, () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`Should auto-generate ID during ngOnInit when (@Input id) is not assigned`, () => {
    // const component = fixture.componentInstance;
    fixture.detectChanges(); //chamar o ngonit na mao
    expect(component.id).toBeTruthy();
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

  // it(`#${LikeWidgetComponent.prototype.likeInWidget.name}  should trigger (@Output liked) when called - soft version`,
  //   () => {
  //     spyOn(component.liked, 'emit');
  //     fixture.detectChanges();
  //     component.likeInWidget();
  //     expect(component.liked.emit).toHaveBeenCalled();
  //   });
  //

  it(`(D) Should display number of likes when clicked`, done => {
    fixture.detectChanges(); //start ngOnInit
    component.liked.subscribe(() => {
      component.likes++;
      //
      // //após o clique, deve ser atualizado para notificar o DOM
      fixture.detectChanges();
      //
      const counterEL: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEL.textContent.trim()).toBe('1');
      done();
    });

    const likeWidgetConteinerEL: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    likeWidgetConteinerEL.click();

    //poderia ser direto, porém este é o teste funcional
    //este teste é para ser feito simulando o clique.
    //component.likes();
  });

  it(`(D) Should display number of likes when ENTER key is pressed`, done => {
    fixture.detectChanges(); //start ngOnInit

    component.liked.subscribe(() => {
      component.likes++;
      // //após o clique, deve ser atualizado para notificar o DOM
      fixture.detectChanges();
      const counterEL: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEL.textContent.trim()).toBe('1');
      done();
    });

    const likeWidgetConteinerEL: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    //keyup -> igual o evento que está no html.
    const event = new KeyboardEvent('keyup',{key: 'Enter'})
    likeWidgetConteinerEL.dispatchEvent(event);

    //exemplo
    //const event = new KeyboardEvent('keyup',{key: 'ArrowIp'})

  });


});
