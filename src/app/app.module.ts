import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LikeWidwetModule} from "./shared/components/like-widget/like-widwet.module";
import {PhotoFrameModule} from "./shared/components/photo-frame/photo-frame.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LikeWidwetModule,
    PhotoFrameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
