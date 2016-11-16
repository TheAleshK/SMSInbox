// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'mydate'
// })
// export class MydatePipe implements PipeTransform {

//   transform(value: string, args: string[]): any {
//     if (!value) return value;

//     return value.replace(/\w\S*/g, function (txt) {

//       let res = txt.split("T");
//       let res1 = res[0].split("-")
//       let res2 = res[1].split(":")

//       // console.log(res)
//       // console.log(res1)
//       // console.log(res2)


//       return res1[2] + '. ' + res1[1] + '. ' + res1[0] + '    ' + res2[0] + ':' + res2[1] + ':' + res2[2];
//     });
//   }

// }
