import { Component } from '@angular/core';
import { gql } from 'apollo-angular';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { NewQuote, Quote } from 'src/app/shared/models/Quote';

import { QuoteComponent } from '../quote/quote.component';
import { QuoteService } from '../services/quote.service';
import { QuotesService } from '../services/quotes.service';

const NEW_QUOTE_MUTATION = gql`
  mutation CreateQuote($quote: String!, $author: String!) {
    createQuote(quoteInput: { quote: $quote, author: $author }) {
      author
      quote
    }
  }
`;

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  providers: [DialogService],
})
export class QuoteListComponent {
  quotes$: Observable<Quote[]>;
  newQuote = false;

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
        this._quoteService.handleQuoteMutation(quote, NEW_QUOTE_MUTATION);
      }
    });
  }

  trackByQuoteId(index: number, quote: Quote): string {
    return quote._id;
  }
}
