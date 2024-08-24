import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, finalize } from "rxjs";

var countRequest = 0;

export function LoadingInterceptor(req: HttpRequest<unknown>, next:HttpHandlerFn): Observable<HttpEvent<unknown>>{
  console.log("Loading::Interceptor");
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  countRequest++;
  return next(req).pipe(finalize(() => {
    countRequest--;
    if (!countRequest) {
      spinner.hide();
    }
  }));
}
/*
@Injectable({
  providedIn: "root"
})

export class LoadingInterceptor implements HttpInterceptorFn {
  private counRequest = 0;

  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor");
    this.spinner.show();
    this.counRequest++;
    return next.handle(req).pipe(finalize(() => {
      this.counRequest--;
      if (!this.counRequest) {
        this.spinner.hide();
      }
    }));
  }
}*/

