import { Injectable } from '@angular/core';
import { Apollo, gql, TypedDocumentNode } from 'apollo-angular';
import { NewQuote, Quote } from '../models/Quote';
import { QUOTES, QuotesService } from './quotes.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private _apollo: Apollo) {}

  public handleQuoteMutation(
    quoteToHandle: Quote | NewQuote,
    mutation: TypedDocumentNode<unknown, unknown>
  ) {
    return this._apollo
      .mutate({
        mutation,
        variables: quoteToHandle,
        refetchQueries: [QUOTES]
      })
      .subscribe();

  }
}