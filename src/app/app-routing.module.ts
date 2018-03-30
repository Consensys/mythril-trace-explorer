import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'upload', component: UploadComponent },
  { path: '**', redirectTo: 'workspace' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
