import { Component } from '@angular/core';
import { FormService } from '../service/form.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent {

  constructor(private service : FormService, private route : Router, private activeRoute : ActivatedRoute) {}
  
  Arr = this.service.serviceArray

  edit(index : any){
    this.route.navigate(['add-form/edit/' + index])
  }

  delete(i:any) {
    window.confirm("Are you sure wnat to delete?")
    this.service.serviceArray.splice(i, 1);
    console.log(i);
  }

  redirectToLink(index : any): void {
    this.route.navigate(['profile/' + index]);
}
  

}
