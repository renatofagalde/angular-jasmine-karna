import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LikeWidwetModule} from "../like-widget/like-widwet.module";
import {PhotoFrameComponent} from "./photo-frame.component";

@NgModule({
  declarations: [PhotoFrameComponent],
  imports: [CommonModule,
    LikeWidwetModule],
  exports: [PhotoFrameComponent]
})

export class PhotoFrameModule {

}
