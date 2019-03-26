import { AngularFirestore } from 'angularfire2/firestore';
import { Attendance } from './../interfaces/Iattendance';
import { Students } from './../interfaces/Istudent';
import { DatabaseServiceService } from './../services/database-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { StorageAzureServiceService } from '../services/storage-azure-service.service';
import { element } from '@angular/core/src/render3';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements AfterViewInit, OnInit {
  manual: boolean = false;
  option = "Manual";
  option2 = "capture";
  students: Students[];
  clsId: string;
  courseId: string;
  attendance;
  loading;
  courseSemester;
  @ViewChild('player') player: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('captureBtn') captureBtn: ElementRef;
  @ViewChild('imagePickerArea') imagePickerArea: ElementRef;

  constructor(
    private loadingCtrl: LoadingController,
    public sas: StorageAzureServiceService,
    public fireStorage: AngularFireStorage,
    public actRoute: ActivatedRoute,
    public afs: AngularFirestore,
    public dbs: DatabaseServiceService) {
    this.clsId = actRoute.snapshot.paramMap.get('calssId');
    this.courseId = actRoute.snapshot.paramMap.get('courseId');
    this.dbs.getStudentsByClass(this.clsId)
      .subscribe((students) => {
        this.students = students;
        this.attendance = new Array<Attendance>();
        this.students.forEach((student) => {
          let attendance: Attendance = {
            teacher: JSON.parse(localStorage.getItem('user')).email,
            status: false,
            date: new Date().toUTCString(),
            studentId: student.enrollmentId,
            personId: student.personId,
            courseId: this.courseId,
            semesterId: student.status.toString(),
          };
          this.attendance.push(attendance);
        });
        // console.log(students);
        console.log(this.attendance);
      });
    


  }

  getPic(eid:any){
return this.students[this.students.findIndex(e=>e.enrollmentId==eid)].imageId;
  }

  async presentLoading(type: any) {

    if (type == "present") {
      this.loading = await this.loadingCtrl.create({
        message: 'Working....'
      });
      await this.loading.present();
    }
    else if (type == "dismiss") {
      await this.loading.dismiss()
    }
  }

  uploadImage(event: any) {

    this.presentLoading('present');

    let file = event.target.files[0];
    this.uplaodAndFurtherApiCalling(file);

  }

  toggleOption2() {
    this.option2 == "capture" ? this.option2 = "upload" : this.option2 = "capture";
  }

  markAttendance(enrolId: any, i) {
    // console.log(`${enrolId} is present! ${i}`);
    this.attendance[i].status = true;
  }

  markAutoAttendance(personIds: any[]) {
    
    personIds.forEach((element) => {
      let i=this.attendance.findIndex((x) => (x.personId == element));
      console.log(this.attendance[i],"present");
      this.attendance[i].status = true;

    });
    this.manual=true;
    console.log(this.attendance);

  }

  submitAttendance() {
    this.presentLoading("present");
    this.attendance.forEach(element => {
      this.dbs.markAttendaceInDb(element).then((e)=>{
        console.log(e);
        this.presentLoading('dismiss');
      }).catch(e=>{console.log(e);this.presentLoading('dismiss')});
    });
    console.log(this.attendance);
  }

  capturePic() {
    this.presentLoading('present');
    this.player.nativeElement.style.display = "none";
    // this.captureBtn.nativeElement.style.display="none";
    this.canvas.nativeElement.style.display = "block";
    let context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.player.nativeElement, 0, 0, this.canvas.nativeElement.width,
      this.player.nativeElement.videoHeight / (this.player.nativeElement.videoWidth / this.canvas.nativeElement.width)
    );
    let file = this.dataURItoBlob(this.canvas.nativeElement.toDataURL());
    console.log(this.attendance);

    this.uplaodAndFurtherApiCalling(file);

    console.log(file);
  }

  uplaodAndFurtherApiCalling(file: any) {
    let task = this.fireStorage.ref(`${this.clsId}/${this.courseId}/${new Date().toUTCString()}`)
      .put(file)
      .then((file) => {

        task.finally(() => {
          file.ref.getDownloadURL().then((e) => {


            this.sas.detect(e).toPromise().then((faceIds) => {
              // console.log("faceIds", faceIds);
              this.sas.identify(faceIds).toPromise().then((res) => {
                // console.log(res);
                console.log("faceidsffffff",res);
                let faceIdsResponse: any = res;
                let personIds: any[] = new Array();
                faceIdsResponse.forEach(element => {
                  if(element.candidates.length>0&&element.candidates[0].confidence>=0.5){
                    personIds.push(element.candidates[0].personId);
                  }
                  // console.log(element.candidates[0].personId);
                });
                this.presentLoading('dismiss');
                this.markAutoAttendance(personIds);
              })
            })
            // console.log(e)
          })
        });
      })
      .catch((e) => {
        this.presentLoading('dismiss');
        alert(e.message);
      });
  }

  dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: mimeString });
    return blob;
  }


  initializeMedia() {
    if (!('mediaDevices' in navigator)) {
    }
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.player.nativeElement.srcObject = stream;
      })
      .catch((e) => {
        alert(e.message);
        this.imagePickerArea.nativeElement.style.display = 'block';
      })
      ;
  }

  ngAfterViewInit() {
    this.initializeMedia();

  }

  ngOnInit() {
  }

  toggleOption() {
    console.log(this.manual, this.option);
    this.manual = !this.manual;
    this.manual != true ? this.option = "Manual" : this.option = "Automatic";
  }


}