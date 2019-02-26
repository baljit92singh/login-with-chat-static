import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  messages = [];
  messageForm: FormGroup;
  mode = 'new';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar,
    public fb: FormBuilder) {
    this.messageForm = this.fb.group({
      message: new FormControl(''),
      avatar: null,
      date: new Date()
    })

  }

  ngOnInit(): void {
  }

  checkCondition() {
    this.mode = 'view';
  }

  checkConditionBack() {
    this.mode = 'new';
  }

  submit() {
    let item = {
      message: this.messageForm.controls['message'].value,
      image: this.messageForm.controls['avatar'].value,
      date: new Date()
    }
    console.log(item)
    this.messages.push(item);
    this.messageForm.controls['message'].reset();
   this.clearFile()
  }

  clearFile(){
    this.messageForm.controls['avatar'].setValue(null)
    this.fileInput.nativeElement.value = '';
  }

  logoutData() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.snackBar.open("Logout successfully", 'Dismiss', { duration: 3000 });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log(file);
      reader.onload = () => {
        this.messageForm.controls['avatar'].setValue(reader.result)
      };
    }
  }
}
