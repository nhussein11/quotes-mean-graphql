import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-ui-textarea',
  templateUrl: './ui-textarea.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextareaComponent {
  @Input() form!: FormGroup;
  @Input() formControlNameAccesor!: string;

  constructor(private rootForm: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootForm.control;
  }
}