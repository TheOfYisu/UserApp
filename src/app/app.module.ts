import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { UpdateComponent } from './components/update/update.component';
import { CreateComponent } from './components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './core/pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    UpdateComponent,
    CreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
