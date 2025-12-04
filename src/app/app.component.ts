import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, HeaderComponent],
  standalone: true,
  providers: [],
})
export class AppComponent implements OnInit {
  protected store = inject(EcommerceStore);

  ngOnInit() {
    this.store.loadProducts();
  }
}
