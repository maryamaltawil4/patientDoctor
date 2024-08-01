import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {fontTajawalMedium} from '../../assets/TajawalMedium'


const tajawalFontBase64 = fontTajawalMedium; 

pdfFonts.pdfMake.vfs['TajawalMedium.ttf'] = tajawalFontBase64;

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  },
  Tajawal: {
    normal: 'TajawalMedium.ttf',
    bold: 'TajawalMedium.ttf',
    italics: 'TajawalMedium.ttf',
    bolditalics: 'TajawalMedium.ttf'
  }
};

@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  visits: any[] = [];

  constructor(private route: ActivatedRoute, private _router: Router) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.visits = JSON.parse(params['visits']);
    });
  }
  
  async generatePDF(): Promise<void> {
    const backgroundImage = await this.getBase64ImageFromURL('assets/iStock-505888734 (1).webp');
    const logo = await this.getBase64ImageFromURL('assets/pT7K9dg6c.jpg');

    const docDefinition = {
      content: [
        {
          image: logo,
          width: 50,
          alignment: 'center',
          margin: [0, 0, 0, 0]
        },
        {
          text: 'Lab Order #617',
          fontSize: 14,
          alignment: 'center',
          margin: [0, 10, 0, 20]
        },
        {
          image: backgroundImage,
          width: 440,
          opacity: 0.5,
          absolutePosition: { x: 80, y: 100 }
        },
        {
          text: [
            { text: 'DENTAL-HUB\n', fontSize: 14, bold: true },
            { text: 'Ramallah\n', fontSize: 12 },
            { text: 'Bireh Medical Center\n', fontSize: 12 },
            { text: '+972599760214\n', fontSize: 12 },
            { text: '02-2410987\n', fontSize: 12 }
          ],
          absolutePosition: { x: 40, y: 40 }
        },
        {
          text: [
            { text: 'DR. Tareq Bali\n', fontSize: 14, bold: true },
            { text: 'Dental surgeon & orthodontist\n', fontSize: 12 },
            { text: 'Misr University for science & technology\n', fontSize: 12 },
            { text: 'email: drtareq@dentalhub.com\n', fontSize: 12 }
          ],
          absolutePosition: { x: 400, y: 40 }
        },
        { text: 'Visit Details', style: 'header', alignment: 'center', margin: [0, 79, 0, 10] },
        {
          text: [
            { text: 'Doctor Name: ', bold: true, font: 'Tajawal' }, { text: ` ${this.arabicFormat(this.visits[0].doctorUserNameEn)}\n`, font: 'Tajawal' },
            { text: 'Date: ', bold: true, font: 'Tajawal' }, { text: `${this.visits[0].visitDate}`, font: 'Tajawal' }
          ],
          margin: [0, 10, 0, 20]
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Department', style: 'tableHeader', font: 'Tajawal' }, { text: 'Visit Date', style: 'tableHeader', font: 'Tajawal' }, { text: 'Visit Start Date', style: 'tableHeader', font: 'Tajawal' }, { text: 'Visit End Date', style: 'tableHeader', font: 'Tajawal' }],
              ...this.visits.map(visit => {
                return [
                  { text: visit.departmentName, font: 'Tajawal' },
                  { text: visit.visitDate, font: 'Tajawal' },
                  { text: visit.visitStartDate, font: 'Tajawal' },
                  { text: visit.visitEndDate, font: 'Tajawal' }
                ];
              })
            ]
          },
          layout: {
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return (rowIndex === 0) ? '#CCCCCC' : null;
            },
            hLineWidth: function () { return 0.5; },
            vLineWidth: function () { return 0.5; },
            hLineColor: function () { return '#000000'; },
            vLineColor: function () { return '#000000'; }
          },
          margin: [0, 0, 0, 20]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          font: 'Tajawal'
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
          font: 'Tajawal'
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('VisitDetails.pdf');
  }

  private getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  }

  private arabicFormat(txt: string): string {
    if (txt) {
      txt = String(txt);
      const english = /^[A-Za-z0-9]*$/;
      const subStr = txt.replace(/ /g, "").replace(/-/g, "").replace(/_/g, "").replace(/,/g, "").replace(/!/g, "").replace(/@/g, "").replace(/#/g, "").replace(/$/g, "");
      if (!english.test(subStr)) {
        return txt.split(" ").reverse().join(" ")
      }
    }
    return txt;
  }
}