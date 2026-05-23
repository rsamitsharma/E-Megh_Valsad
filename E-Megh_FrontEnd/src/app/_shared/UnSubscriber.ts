/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
@Component({
  template: "",
})
export class UnSubscriber implements OnDestroy {
  private _subscription: Subscription = new Subscription();

  protected resetSubscriptions() {
    this._subscription?.unsubscribe();
  }

  addSubscription(sub: Subscription) {
    this._subscription.add(sub);
  }

  set anotherSubscription(sub: Subscription) {
    this._subscription.add(sub);
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
