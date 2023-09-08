import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  imageUrl: string | null = null;
  serviceArray : any[] =[]

  constructor() { }
}
