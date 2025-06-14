import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.html',
  styleUrls: ['./error.css'],
})
export class Error {
  errorCode: string | null = null;
  errorMessage: string | null = null;

  constructor(private location: Location, private route: ActivatedRoute) {
    this.errorCode = this.route.snapshot.queryParamMap.get('code');
    this.errorMessage = this.route.snapshot.queryParamMap.get('message');
  }

  volver() {
    this.location.back();
  }
}
