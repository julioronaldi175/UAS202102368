import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})
export class MahasiswaComponent implements OnInit {

  data: any;
  tableKu: any;

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');

    this.tableKu = $('#tableKu').DataTable();

    this.bindMahasiswaTable();
  }

  bindMahasiswaTable(): void {
    this.http.get('https://stmikpontianak.net/011100862/tampilMahasiswa.php')
      .subscribe((data: any) => {

        this.tableKu.clear();
        data.forEach((element: any) => {


          var tempatTglLahir = element.TempatLahir + ", " + element.TanggalLahir;
          var row = [
            element.NIM,
            element.Nama,
            element.JenisKelamin,
            tempatTglLahir,
            element.JP,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk
          ]

          this.tableKu.row.add(row);
        });
        this.tableKu.draw(false);
      });


  }

}