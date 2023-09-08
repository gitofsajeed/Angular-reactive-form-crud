import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(
    private service : FormService,
    private route: ActivatedRoute){}

  formData : any; 
  // imgURL= this.service.imageUrl
  image : any = null

  ngOnInit(): void {
    this.route.params.
      subscribe(params => 
        {
      const index = +params['index'];
      this.formData = this.service.serviceArray[index];
      // this.imgURL = this.service.serviceArray[index].image
      this.image=this.service.serviceArray[index].image
  });
  // console.log('img',this.imgURL);
  
  
  
  }

}
