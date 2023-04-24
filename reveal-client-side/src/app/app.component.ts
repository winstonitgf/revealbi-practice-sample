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
  revealView: any = undefined;
  ngAfterViewInit(): void {
    $.ig.RevealSdkSettings.setBaseUrl("http://localhost:8081");
    $.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function () {
      var headers: any = {};
      headers["user-id"] = "1"
      return headers;
    });

    this.revealView = new $.ig.RevealView(this.el.nativeElement);


    this.loadUserOneDashboard();
  }

  // after fetch user context from server, we can determine which dashboard to load base on user context
  public loadUserOneDashboard() {

    $.ig.RVDashboard.loadDashboard("新的儀表板", (dashboard: any) => {

      this.revealView.dashboard = dashboard;
      this.revealView.onDataSourcesRequested = (callback: any) => {
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

  // after fetch user context from server, we can determine which dashboard to load base on user context
  public loadUserTwoDashboard() {
    $.ig.RVDashboard.loadDashboard("MySQL", (dashboard: any) => {

      this.revealView.dashboard = dashboard;
      this.revealView.onDataSourcesRequested = (callback: any) => {
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
  public createNewDashboard() {
    this.revealView.dashboard = new $.ig.RVDashboard();
  }
}
