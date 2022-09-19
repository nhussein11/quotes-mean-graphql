import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { NewQuote, Quote } from 'src/app/models/Quote';
import { QuoteService } from 'src/app/services/quote.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { QuoteComponent } from '../quote/quote.component';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  providers: [DialogService],
})
export class QuoteListComponent {
  quotes$: Observable<Quote[]>;
  newQuote: boolean = false;

  constructor(
    private _quoteService: QuoteService,
    private _quotesService: QuotesService,
    private _dialogService: DialogService
  ) {
    this.quotes$ = this._quotesService.quotes;
  }
  
  createNewQuote() {
    const dialogReference = this._dialogService.open(QuoteComponent, {
      header: 'Create a new quote!',
      width: '30%',
    });

    dialogReference.onClose.subscribe((quote: NewQuote) => {
      if (quote) {
        this._quoteService.createNewQuote(quote);
      }
    });
  }
}
