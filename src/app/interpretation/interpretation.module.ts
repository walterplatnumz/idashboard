import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InterpretationListComponent} from './components/interpretation-list/interpretation-list.component';
import {FormsModule} from '@angular/forms';
import {AutosizeDirective} from './directives/autosize.directive';
import {FilterPipe} from './pipes/filter.pipe';
import {InterpretationService} from './services/interpretation.service';
import { AddInterpretationComponent } from './components/add-interpretation/add-interpretation.component';
import { InterpretationCommentComponent } from './components/interpretation-comment/interpretation-comment.component';
import { AbbreviatePipe } from './pipes/abbreviate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InterpretationListComponent,
    AutosizeDirective,
    FilterPipe,
    AddInterpretationComponent,
    InterpretationCommentComponent,
    AbbreviatePipe
  ],

  exports: [InterpretationListComponent],
  providers: [InterpretationService]
})
export class InterpretationModule { }
