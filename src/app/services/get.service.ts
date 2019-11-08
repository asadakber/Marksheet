import { Injectable } from '@angular/core';
import { MarksheetService } from '../services/marksheet.service';
@Injectable({
  providedIn: 'root'
})
export class GetService {
  MarksList = []
  // totalOwed: number;
  constructor(private marksheetservice: MarksheetService) { }
  
  getmarks() {
    this.marksheetservice.getMarks().subscribe(
      list => {
        this.MarksList = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        })
        // this.getTotalOwed();
      }
    )
  }

  // getTotalOwed() {
  //   let total = 0;
  //   for(let i = 0; i < this.MarksList.length; i++ ) {
  //     total += parseFloat(this.MarksList[i].totalmarks)
  //   }
  // }

}
