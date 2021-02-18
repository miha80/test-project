import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class TestItemsEffects {

  constructor(
    private actions$: Actions,
    //private store: Store<{}>,
  ) {
  }
/*
  clearMatchingSolution$ = createEffect(() =>
  this.actions$.pipe(
    ofType(smartHelperActions.clearMatchingSolution),
    exhaustMap((action: ISetMatchingSolution) => {
      this.store.dispatch(userQueueActions.setLoadingState({state: true}));
      return this.issueService.clearMatchingSolution(action).pipe(
        catchError((e) => {
          return this.logger.errorHandler(
            e,
            err => {
              this.store.dispatch(userQueueActions.setLoadingState({state: false}));
            }
          );
        }),
      );
    }),
    map((issue: issueProto.IssueDTO) => {
      const issueModel: IIssueModel = IssuesEffects.parseIssueDto(issue);
      this.store.dispatch(issueActions.updateIssues({issues: [issueModel]}));
      return userQueueActions.setAssociatedIssues({ issues: [issueModel] });
    }),
    tap(() => this.store.dispatch(userQueueActions.setLoadingState({state: false}))),
  ));
*/
}
