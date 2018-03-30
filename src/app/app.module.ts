import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MatToolbarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

// pages
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { UploadComponent } from './pages/upload/upload.component';

// components
import { ExplorerComponent } from './components/explorer/explorer.component';
import { GraphComponent } from './components/graph/graph.component';

// services
import { StatespaceService } from './services/statespace.service';

// pipes
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    UploadComponent,
    ExplorerComponent,
    GraphComponent,
    ReversePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    StatespaceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
