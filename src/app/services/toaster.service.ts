import { inject, Injectable } from '@angular/core';
// import { HotToastService } from '@ngxpert/hot-toast';

// TODO: replace with angular material toast
@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  // private toasterService = inject(HotToastService);

  public success(message: string) {
    // this.toasterService.success(message);
  }

  public error(message: string) {
    // this.toasterService.error(message);
  }

  public loading(message: string) {
    // this.toasterService.loading(message);
  }
}
