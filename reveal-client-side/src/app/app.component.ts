import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'reveal-client-sidex';
  @ViewChild('revealView') el!: ElementRef;

  ngAfterViewInit(): void {
    $.ig.RevealSdkSettings.setBaseUrl("http://localhost:8080");
    $.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();
    var revealView = new $.ig.RevealView(this.el.nativeElement);
    $.ig.RVDashboard.loadDashboard("新的儀表板", (dashboard: any) => {

      revealView.dashboard = dashboard;
      revealView.onDataSourcesRequested = (callback: any) => {
        var sqlDataSource = new $.ig.RVMySqlDataSource();
        sqlDataSource.host = "localhost";
        sqlDataSource.port = "3306"
        sqlDataSource.database = "sso";
        sqlDataSource.title = "MySQL";

        var localFileItem = new $.ig.RVLocalFileDataSourceItem();
        localFileItem.uri = "local:/Attendee.xlsx";
        var excelDataSourceItem = new $.ig.RVExcelDataSourceItem(localFileItem);
        excelDataSourceItem.title = "Attendee";
        callback(new $.ig.RevealDataSources([sqlDataSource], [excelDataSourceItem], true));
      };
    });



  }
}
