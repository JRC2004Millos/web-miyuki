import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-en-construccion',
  imports: [],
  templateUrl: './en-construccion.html',
  styleUrl: './en-construccion.css',
})
export class EnConstruccion {
  constructor(private location: Location, private route: ActivatedRoute) {}

  volver() {
    this.location.back();
  }
}
