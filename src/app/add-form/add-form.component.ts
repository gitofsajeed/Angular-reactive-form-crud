import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators} from '@angular/forms';
import { FormService } from '../service/form.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit{

  title = "Add Professional Data"
  submit = false
  // editData :any;
  FormDataArray : any[]= []
  index: any;
  item : any; 
  selectedFile: File | null = null; // To store the selected file
  imageUrl = this.serviceArr.imageUrl

  ngOnInit(): void {
    this.index= this.activeRoute.snapshot.paramMap.get('index');
    console.log('Index is', this.index);
    if (this.index >= 0 && this.index < this.serviceArr.serviceArray.length) {

      this.item = this.serviceArr.serviceArray[this.index];
      console.log('Item is', this.item);
      this.addform.patchValue({
        Name: this.item.Name,
        Address: this.item.Address,
        gender: this.item.gender,
        qualif : this.item.qualif,
        image: this.item.image, 
        phone: this.item.phone,
        email: this.item.email,
        skills: this.item.skills,
        pSkills: this.item.pSkills,
      }); 
    } else {
      console.error('Invalid index');
    }

  }

  constructor(private form : FormBuilder, private serviceArr : FormService,private route : Router, private activeRoute : ActivatedRoute){}  
  

  addform=  this.form.group({
    Name : ['', Validators.required],
    Address : ['', Validators.required],
    gender: ['', Validators.required],
    qualif : this.form.array([]),
    image : [''],
    phone :['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    email : ['', [Validators.required, Validators.email]],
    skills: ['', Validators.required],
    extraSkills:this.form.array([]),
    pSkills : ['', Validators.required],
    extraPSkills:this.form.array([]),
  })


  

  get extraSkills(){
    return this.addform.get('extraSkills') as FormArray
  }

  get extraPSkills(){
    return this.addform.get('extraPSkills') as FormArray
  }

  get qualificationsArray() {
    return this.addform.get('qualif') as FormArray;
  }

  addSkills(){
    this.extraSkills.push(this.form.control(''))
  }
  deleteSkill(index:any){
    this.extraSkills.removeAt(index);
  }

  addPSkills(){
    this.extraPSkills.push(this.form.control(''))
  }
  deletePSkill(index :any){
    this.extraPSkills.removeAt(index);
  }

  addQualification(qualification: string) {
    this.qualificationsArray.push(this.form.control(qualification));
  }

  get formData(){
    return this.addform.controls;
  }

  onSubmit() {
    this.submit = true;
  
    if (this.addform.valid) {
      // console.log("editdata", this.editData);
      if (this.item && this.item.Name) {
        this.item = this.addform.value
        // this.item  = this.editData;
        // console.log("editdata", this.editData);
        console.log('edit added to item', this.item);
        
        const itemIndex = this.serviceArr.serviceArray.findIndex((element) => element.id === this.item.id);
        this.serviceArr.serviceArray[itemIndex] = this.item;
        console.log("ii :",itemIndex);
        
  
        } else{
        this.FormDataArray.push(this.addform.value);
        this.serviceArr.serviceArray.push(this.addform.value);
        console.log("add-data");   
        
        const newItem = this.addform.value;
        newItem.image = this.imageUrl; 
        // this.serviceArr.serviceArray.push(newItem);
        }
      console.log("sda :", this.FormDataArray);
      console.log("serv",this.serviceArr.serviceArray);

      this.route.navigate(['']);
      this.addform.reset();


    }
  }
  

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];

      // Display the selected image immediately
      this.uploadImage();
    }
  }

  
  uploadImage() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }


  resetForm(){
    this.addform.reset();
  }
  
}
  
  
  

