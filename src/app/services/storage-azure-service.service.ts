import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageAzureServiceService {

  constructor(private http: HttpClient) { }


  // Endpoint: https://westcentralus.api.cognitive.microsoft.com/face/v1.0

  // Key 1: 437b5edf675f4197933508001bd44932
  
  // Key 2: 55d9f6dcc8d9496fb7b98b3ee8d38a8d
  
  // key: string = "437b5edf675f4197933508001bd44932";old

  key: string = "a0644eb3014b46038a56e736a47bf37a";


  detectApiEndPoint="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true";
  identifyApiEndPoint="https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify";

  detect(imgUrl:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'http://localhost:8100',
        'Ocp-Apim-Subscription-Key': this.key,
        
      })
    };
  return this.http.post(this.detectApiEndPoint, {"url":imgUrl}, httpOptions);
  }


  identify(faceIds:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'http://localhost:8100',
        'Ocp-Apim-Subscription-Key': this.key,
        'Content-Type': 'application/json',
      })
    };
    let requestBody={
      "personGroupId": "students",
      "faceIds": [],
    };
    faceIds.forEach(element => {
      requestBody.faceIds.push(element.faceId)
    });
    console.log(requestBody);
  return this.http.post(this.identifyApiEndPoint, requestBody, httpOptions);
  }


}
