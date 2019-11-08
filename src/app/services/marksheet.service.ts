import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MarksheetService {
  MarksList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.MarksList = this.db.list('Marksheet')
   }

   MarkForm: FormGroup = new FormGroup({
     $key: new FormControl(null),
     name: new FormControl('', Validators.required),
     age: new FormControl(0, Validators.required),
     math: new FormControl(0, Validators.required),
     English: new FormControl(0, Validators.required),
     Physics: new FormControl(0, Validators.required),
     Urdu: new FormControl(0, Validators.required),
     Islamiat: new FormControl(0, Validators.required),
     PakStudies: new FormControl(0, Validators.required),
   })

   initializeFormGroup() {
     this.MarkForm.setValue({
      $key: null,
      name: '',
      age: 0,
      math: 0,
      Physics: 0,
      English: 0,
      Urdu: 0,
      Islamiat: 0,
      PakStudies: 0,
     })
   }

   popularForm(marks) {
     this.MarkForm.setValue(marks)
   }

   getMarks() {
     return this.MarksList.snapshotChanges()
   }

   getMarksDetails(marksId: string): AngularFireObject<any> {
    return this.db.object(`/Marksheet/${marksId}`)
   }
   
 

   AddMarks(marks) {
    this.MarksList.push({
       name: marks.name,
       age: marks.age,
       math: marks.math,
       Physics: marks.Physics,
       English: marks.English,
       Urdu: marks.Urdu,
       Islamiat: marks.Islamiat,
       PakStudies: marks.PakStudies,
       totalmarks: marks.math + marks.Physics + marks.English + marks.Urdu +  marks.Islamiat + marks.PakStudies,
       percentage: ((marks.math + marks.Physics + marks.English + marks.Urdu +  marks.Islamiat + marks.PakStudies)*100/500),
     
      })
      
   }


   UpdateMarks(marks) {
    this.MarksList.update(marks.$key, {
       name: marks.name,
       age: marks.age,
       math: marks.math,
       Physics: marks.Physics,
       English: marks.English,
       Urdu: marks.Urdu,
       Islamiat: marks.Islamiat,
       PakStudies: marks.PakStudies,
       totalmarks: marks.math + marks.Physics + marks.English +  marks.Urdu +  marks.Islamiat + marks.PakStudies,
       percentage: ((marks.math + marks.Physics + marks.English + marks.Urdu +  marks.Islamiat + marks.PakStudies)*100/500),
      })
   }

   deleteMarks($key: string) {
     this.MarksList.remove($key)
   }


}
